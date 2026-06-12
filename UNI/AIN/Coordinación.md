
# Intercambio de Información Meta-Nivel

Consiste en intercambiar información a nivel de control sobre las prioridades y planes actuales. La información en este nivel puede cambiar e **influye en las decisiones** de los agentes.

No se especifican qué objetivos se tendrán en cuenta o no, así que es impreciso y sólo funciona a corto o medio plazo.

La implementación más relevante es la del *Partial Global Planning* o PGP. Su nombre viene de que no se genera un plan para todo el sistema (Partial) y de que los agentes forman planes intercambiándose entre si planes locales para lograr una visión global de la resolución del problema.

Parte de la premisa del problema es que las tareas están descompuestas en tareas más pequeñas y que los agentes pueden estar planificando cuáles llevar a cabo en un momento dado sin saber cuáles están planificando el resto de agentes. El objetivo de PGP es desarrollar una consciencia o conocimiento suficientes para que los agentes se coordinen. Consta de 3 etapas iteradas:
1. Cada agente decide sus objetivos y genera planes a corto plazo.
2. Los agentes intercambian información para averiguar donde interactúan sus planes con los del resto y sus objetivos con los del resto.
3. Los agentes modifican sus planes locales iniciales para coordinar mejor las actividades entre ellos.

# Planificación multi-agente

La planificación multi-agente se base en establecer de antemano y con precisión que tareas asumirá cada uno de los agentes y que secuencia de acciones llevará a cabo cada agente para cumplir sus tareas.

Consideramos dos aproximaciones:
- Centralizada: Los planes los desarrolla un coordinador central.
- Distribuida: Un grupo de agentes cooperan para forman un plan. El plan puede ser centralizado o distribuido en sí mismo.