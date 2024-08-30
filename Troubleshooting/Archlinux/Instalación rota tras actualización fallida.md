
# Descripción del problema

Se apagó el ordenador solo mientras se ejecutaba `pacman -Syu`, probablemente durante la instalación de `linux` o `linux-lts`.

Al encenderse de nuevo, `systemd-boot` solo mostraba la opción de iniciar desde el Firmware y, a pesar de que aparecen la partición de Linux y de Boot, no se podía iniciar con ninguna de ellas.

# Arreglo

## Iniciar desde el Live ISO de archlinux

Usando un USB Booteable con la ISO de Archlinux, tras habilitar el WiFi con `iwctl` y establecer la distribución de teclado correcta, se ejecuta lo siguiente:

```bash
lsblk # para ver los discos y particiones
mount /dev/nvme0n1p2 /mnt # montar la particiones principal
mount /dev/nme0n1p1 /mnt/boot # montar la particion de arranque
arch-chroot /mnt
```

## Arreglar partición de arranque y el kernel

Una vez en la partición principal desde el Live ISO, se ha reinstalado `linux` y `mkinitcpio`, y se ha vuelto a generar el initramfs y actualizado la partición de arranque. Para reinstalar los paquetes, se ha tenido que borrar primero el archivo `db.lck`, que se queda creado cuando falla una operación de escritura de `pacman`, como es este caso.

```bash
rm /var/lib/pacman/db.lck
pacman -S linux mkinitcpio
mkinitcpio -P
bootctl update path=/boot
```

## Arreglar problemas con `systemd`/`dbus`

Tras el paso anterior, se podía iniciar el SO, pero no se podía iniciar ningún entorno de escritorio o WM, ni funcionaban muchos otros servicios como `NetworkManager` o `bluetoothctl`. Si se podía, sin embargo, iniciar el shell, acceder a archivos y usar comandos normalmente.

Al no poder acceder a internet, se volvió a iniciar desde el Live ISO como se describe anteriormente y se hicieron varias búsquedas de los paquetes que estaban malformados:

```bash
pacman -Qk 2>/dev/null | grep -v '0 missing files' # 0 resultados
pacman -Qkk 2>/dev/null | grep 'altered file' | grep -v '0 altered'
```

Sólo segundo comando dio resultados, y se reinstalaron todos los archivos que listaba, pero tras reiniciar al SO seguía habiendo exactamente el mismo problema (`pacman` no trató de volver a descargarlos ni siquiera tras borrar la caché, a sí que las checksum debían coincidir).

Tras volver a iniciar desde el Live ISO, se volvió a hacer una búsqueda con el siguiente comando:

```bash
pacman -Qkk 2>/dev/null | grep 'mtree'
```

Después, se instalaron todos los paquetes que tenían un mtree faltante o malformado en dos pasos con `pacman -S --dbonly <paquetes>` y `pacman -S --only <paquetes>` y, tras un reinicio, todo funcionaba perfectamente.

La mayoría de paquetes no tenían nada de importante, había algunos como `maven` o `java-nosequé` que probablemente no afectasen al funcionamiento del sistema en general, pero aún así merece la pena arreglarlos.

Sin embargo, había dos paquetes especialmente importantes que se reinstalaron con este proceso: `linux-lts` y `systemd`. Dado que el `systemd-boot` tiene como opción por defecto `linux` y no `linux-lts`, lo más probable es que el paquete que causaba problemas fuese `systemd`.

### Log de errores

Antes de arreglarlo, el comando `journalctl -p5` mostraba el siguiente log de errores tras el arranque del sistema e inicio de sesión en el shell.

```log
Aug 30 19:00:19 archlinux ly-dm[1114]: pam_systemd_home(ly:auth): Failed to connect to system bus: Connection refused
Aug 30 19:00:19 archlinux ly-dm[1114]: pam_systemd_home(ly:account): Failed to connect to system bus: Connection refused
Aug 30 19:00:19 archlinux ly-dm[1114]: pam_systemd_home(ly:session): Failed to connect to system bus: Connection refused
Aug 30 19:00:19 archlinux ly-dm[1114]: pam_systemd(ly:session): Failed to connect to system bus: Connection refused
Aug 30 19:00:47 archlinux nvidia-persistenced[948]: Shutdown (948)
Aug 30 19:00:47 archlinux systemd[1]: Shutting down.
Aug 30 19:00:47 archlinux kernel: watchdog: watchdog0: watchdog did not stop!
Aug 30 19:01:00 archlinux kernel: Linux version 6.10.7-arch1-1 (linux@archlinux) (gcc (GCC) 14.2.1 20240805, GNU ld (GNU Binutils) 2.43.0) #1 SMP PREEMPT_DYNAMIC Thu, 29 Aug 2024 16:48:57 +0000
Aug 30 19:01:00 archlinux kernel: random: crng init done
Aug 30 19:01:00 archlinux kernel: Kernel command line: initrd=\initramfs-linux.img root=PARTUUID=9dc58990-b52a-4e0b-aa7c-e9ca55f5d862 zswap.enabled=0 rw rootfstype=ext4
Aug 30 19:01:00 archlinux kernel: x86/cpu: SGX disabled by BIOS.
Aug 30 19:01:00 archlinux kernel: MDS CPU bug present and SMT on, data leak possible. See https://www.kernel.org/doc/html/latest/admin-guide/hw-vuln/mds.html for more details.
Aug 30 19:01:00 archlinux kernel: MMIO Stale Data CPU bug present and SMT on, data leak possible. See https://www.kernel.org/doc/html/latest/admin-guide/hw-vuln/processor_mmio_stale_data.html for more details.
Aug 30 19:01:00 archlinux kernel: audit: type=2000 audit(1725037256.106:1): state=initialized audit_enabled=0 res=1
Aug 30 19:01:00 archlinux kernel: ACPI: [Firmware Bug]: BIOS _OSI(Linux) query ignored
Aug 30 19:01:00 archlinux kernel: SCSI subsystem initialized
Aug 30 19:01:00 archlinux kernel: VFS: Disk quotas dquot_6.6.0
Aug 30 19:01:00 archlinux kernel: Initialise system trusted keyrings
Aug 30 19:01:00 archlinux kernel: Key type blacklist registered
Aug 30 19:01:00 archlinux kernel: integrity: Platform Keyring initialized
Aug 30 19:01:00 archlinux kernel: integrity: Machine keyring initialized
Aug 30 19:01:00 archlinux kernel: Key type asymmetric registered
Aug 30 19:01:00 archlinux kernel: Asymmetric key parser 'x509' registered
Aug 30 19:01:00 archlinux kernel: ENERGY_PERF_BIAS: Set to 'normal', was 'performance'
Aug 30 19:01:00 archlinux kernel: Loading compiled-in X.509 certificates
Aug 30 19:01:00 archlinux kernel: Loaded X.509 cert 'Build time autogenerated kernel key: c03c4af6d7171c30c37096597ccaf934558a29d0'
Aug 30 19:01:00 archlinux kernel: Key type .fscrypt registered
Aug 30 19:01:00 archlinux kernel: Key type fscrypt-provisioning registered
Aug 30 19:01:00 archlinux kernel: wmi_bus wmi_bus-PNP0C14:03: [Firmware Bug]: WMBD method block execution control method not found
Aug 30 19:01:00 archlinux kernel: i8042: PNP: PS/2 appears to have AUX port disabled, if this is incorrect please boot with i8042.nopnp
Aug 30 19:01:00 archlinux kernel: scsi 2:0:0:0: Direct-Access     Kingston DataTraveler 3.0 PMAP PQ: 0 ANSI: 6
Aug 30 19:01:00 archlinux kernel: sd 2:0:0:0: [sda] 121208832 512-byte logical blocks: (62.1 GB/57.8 GiB)
Aug 30 19:01:00 archlinux kernel: sd 2:0:0:0: [sda] Write Protect is off
Aug 30 19:01:00 archlinux kernel: sd 2:0:0:0: [sda] Write cache: disabled, read cache: enabled, doesn't support DPO or FUA
Aug 30 19:01:00 archlinux kernel: sd 2:0:0:0: [sda] Attached SCSI removable disk
Aug 30 19:01:00 archlinux kernel: sd 2:0:0:0: Attached scsi generic sg0 type 0
Aug 30 19:01:00 archlinux kernel: nvidia: loading out-of-tree module taints kernel.
Aug 30 19:01:00 archlinux kernel: nvidia: module license 'NVIDIA' taints kernel.
Aug 30 19:01:00 archlinux kernel: Disabling lock debugging due to kernel taint
Aug 30 19:01:00 archlinux kernel: nvidia: module verification failed: signature and/or required key missing - tainting kernel
Aug 30 19:01:00 archlinux kernel: nvidia: module license taints kernel.
Aug 30 19:01:01 archlinux kernel: 
Aug 30 19:01:01 archlinux kernel: cfg80211: Loading compiled-in X.509 certificates for regulatory database
Aug 30 19:01:01 archlinux kernel: Loaded X.509 cert 'sforshee: 00b28ddf47aef9cea7'
Aug 30 19:01:01 archlinux kernel: Loaded X.509 cert 'wens: 61c038651aabdcf94bd0ac7ff06c7248db18c600'
Aug 30 19:01:01 archlinux kernel: platform regulatory.0: Direct firmware load for regulatory.db failed with error -2
Aug 30 19:01:01 archlinux kernel: FAT-fs (nvme0n1p1): Volume was not properly unmounted. Some data may be corrupt. Please run fsck.
Aug 30 19:01:01 archlinux bootctl[526]: ! Mount point '/boot' which backs the random seed file is world accessible, which is a security hole! !
Aug 30 19:01:01 archlinux bootctl[526]: ! Random seed file '/boot/loader/random-seed' is world accessible, which is a security hole! !
Aug 30 19:01:01 archlinux kernel: NVRM: loading NVIDIA UNIX x86_64 Kernel Module  560.35.03  Fri Aug 16 21:39:15 UTC 2024
Aug 30 19:01:01 archlinux kernel: nvidia_uvm: module uses symbols nvUvmInterfaceDisableAccessCntr from proprietary module nvidia, inheriting taint.
Aug 30 19:01:01 archlinux kernel: Asymmetric key parser 'pkcs8' registered
Aug 30 19:01:01 archlinux tlp[572]: Error: TLP's power saving will not apply on boot because tlp.service is not enabled --> Invoke 'systemctl enable tlp.service' to ensure the full functionality of TLP.
Aug 30 19:01:02 archlinux systemd-networkd[615]: wlan0: found matching network '/etc/systemd/network/20-wlan.network', based on potentially unpredictable interface name.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Main process exited, code=exited, status=1/FAILURE
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux systemd[1]: Failed to start D-Bus System Message Bus.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Main process exited, code=exited, status=1/FAILURE
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux systemd[1]: Failed to start D-Bus System Message Bus.
Aug 30 19:01:02 archlinux tlp[844]: Error: TLP's power saving will not apply on boot because tlp.service is not enabled --> Invoke 'systemctl enable tlp.service' to ensure the full functionality of TLP.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Main process exited, code=exited, status=1/FAILURE
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux systemd[1]: Failed to start D-Bus System Message Bus.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Main process exited, code=exited, status=1/FAILURE
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux systemd[1]: Failed to start D-Bus System Message Bus.
Aug 30 19:01:02 archlinux tlp[882]: Error: TLP's power saving will not apply on boot because tlp.service is not enabled --> Invoke 'systemctl enable tlp.service' to ensure the full functionality of TLP.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Main process exited, code=exited, status=1/FAILURE
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux systemd[1]: Failed to start D-Bus System Message Bus.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Start request repeated too quickly.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux systemd[1]: Failed to start D-Bus System Message Bus.
Aug 30 19:01:02 archlinux systemd[1]: dbus.socket: Failed with result 'service-start-limit-hit'.
Aug 30 19:01:02 archlinux nvidia-persistenced[943]: Started (943)
Aug 30 19:01:02 archlinux tlp[918]: Error: TLP's power saving will not apply on boot because tlp.service is not enabled --> Invoke 'systemctl enable tlp.service' to ensure the full functionality of TLP.
Aug 30 19:01:02 archlinux bluetoothd[926]: src/main.c:main() Unable to get on D-Bus
Aug 30 19:01:02 archlinux systemd[1]: bluetooth.service: Main process exited, code=exited, status=1/FAILURE
Aug 30 19:01:02 archlinux systemd[1]: bluetooth.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux kernel: ACPI Warning: \_SB.PCI0.RP01.PXSX._DSM: Argument #4 type mismatch - Found [Buffer], ACPI requires [Package] (20240322/nsarguments-61)
Aug 30 19:01:02 archlinux systemd[1]: Failed to start Bluetooth service.
Aug 30 19:01:02 archlinux systemd-logind[941]: Failed to connect to system bus: Connection refused
Aug 30 19:01:02 archlinux systemd-logind[941]: Failed to fully start up daemon: Connection refused
Aug 30 19:01:02 archlinux systemd[1]: systemd-logind.service: Main process exited, code=exited, status=1/FAILURE
Aug 30 19:01:02 archlinux systemd[1]: systemd-logind.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux systemd[1]: Failed to start User Login Management.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Start request repeated too quickly.
Aug 30 19:01:02 archlinux systemd[1]: dbus-broker.service: Failed with result 'exit-code'.
Aug 30 19:01:02 archlinux systemd[1]: Failed to start D-Bus System Message Bus.
Aug 30 19:01:02 archlinux systemd[1]: dbus.socket: Failed with result 'service-start-limit-hit'.
Aug 30 19:01:04 archlinux kernel: Bluetooth: hci0: Malformed MSFT vendor event: 0x02
Aug 30 19:01:04 archlinux kernel: Bluetooth: hci0: Reading supported features failed (-16)
Aug 30 19:01:04 archlinux kernel: Bluetooth: hci0: HCI LE Coded PHY feature bit is set, but its usage is not supported.
Aug 30 19:01:10 archlinux ly-dm[995]: pam_systemd_home(ly:auth): Failed to connect to system bus: Connection refused
Aug 30 19:01:10 archlinux ly-dm[995]: pam_systemd_home(ly:account): Failed to connect to system bus: Connection refused
Aug 30 19:01:10 archlinux ly-dm[995]: pam_systemd_home(ly:session): Failed to connect to system bus: Connection refused
Aug 30 19:01:10 archlinux ly-dm[995]: pam_systemd(ly:session): Failed to connect to system bus: Connection refused
Aug 30 19:03:02 archlinux systemd-networkd-wait-online[668]: Timeout occurred while waiting for network connectivity.
Aug 30 19:03:02 archlinux systemd[1]: systemd-networkd-wait-online.service: Main process exited, code=exited, status=1/FAILURE
Aug 30 19:03:02 archlinux systemd[1]: systemd-networkd-wait-online.service: Failed with result 'exit-code'.
Aug 30 19:03:02 archlinux systemd[1]: Failed to start Wait for Network to be Configured.
Aug 30 19:03:02 archlinux nginx[1072]: 2024/08/30 19:03:02 [warn] 1072#1072: could not build optimal types_hash, you should increase either types_hash_max_size: 1024 or types_hash_bucket_size: 64; ignoring types_hash_bucket_size
Aug 30 19:03:54 archlinux ly-dm[1086]: pam_systemd_home(ly:auth): Failed to connect to system bus: Connection refused
Aug 30 19:03:54 archlinux ly-dm[1086]: pam_systemd_home(ly:account): Failed to connect to system bus: Connection refused
Aug 30 19:03:54 archlinux ly-dm[1086]: pam_systemd_home(ly:session): Failed to connect to system bus: Connection refused
Aug 30 19:03:54 archlinux ly-dm[1086]: pam_systemd(ly:session): Failed to connect to system bus: Connection refused
```


# Recursos

https://bbs.archlinux.org/viewtopic.php?id=284632

https://unix.stackexchange.com/questions/659756/arch-linux-reinstall-all-broken-packages-after-poweroff-during-system-upgrade
https://bbs.archlinux.org/viewtopic.php?id=293335