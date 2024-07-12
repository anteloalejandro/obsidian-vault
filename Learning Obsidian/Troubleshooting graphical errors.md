
# Intro

This is based on my experience fixing the graph view on Obsidian, which was consistently broken -nodes where there but they were completely invisible-  even after several updates. The error happened with the Appimage version of Obsidian on Ubuntu 22.04LTS, but not on mobile.

# Quick fixes

First things first, try switching off hardware acceleration and relaunching Obsidian. At the time of writing, the toggle is located in *Settings→Appearance→Hardware Acceleration*.

If this fixes it, chances are the GPU cache is at fault. Delete the folder `GPUCache` on Obsidian's config directory, which on the previously stated case was on `~/.config/obsidian/`, and relaunch Obsidian.

If deleting the GPU cache didn't do the trick, try deleting all the cache directories, and then relaunch:
- `Cache`
- `Code Cache`
- `DawnCache`
- `GPUCache`

# Other troubleshooting methods

Of course, checking if a plugin is to blame is worth a try. Go to *Settings→Community Plugins→Restricted Mode* to disable all plugins and see what happens.

If that last step does nothing of value, try opening the Sandbox Vault to see if the error does not happen on there.

# Resources

https://www.reddit.com/r/ObsidianMD/comments/16k4lar/whats_going_wrong_with_my_graph_view/

https://www.reddit.com/r/ObsidianMD/comments/16k4lar/whats_going_wrong_with_my_graph_view/

https://forum.obsidian.md/t/graph-view-not-loading-a-graph-linux/64654