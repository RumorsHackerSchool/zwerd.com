---
layout: post
title: Linux Ubuntu
excerpt: "I love so much ubuntu because it so frendly lol, but realy, the reasens in my opinion why to used Ubuntu is because of the communities that support in ubuntu, it's important to understand that the biger the community, the better support, anless u wanna to be hard core in linux and that another immportant field

In the passed week I worked on my "

---

I love so much ubuntu because it so frendly lol, but realy, the reasens in my opinion why to used Ubuntu is because of the communities that support in ubuntu, it's important to understand that the biger the community, the better support, anless u wanna to be hard core in linux and that another immportant field

In the passed week I worked on my grub, this is grub 2 and I setup some opening image, it was so cool after that I decided to setup opening music, so I configure the Hz of "In the Hall of Mountain King". It sound great, to setup your own music sound all you need is to open /etc/default/grub file and in the section of GRUB_INIT_TUNE write your own code, the first number is the tempo, and after that the nubers goes as a peers the first one is the Hz tune and the second is the delay of the tune, as example:
```
GRUB_INIT_TUNE="412 265 4 165 4 265 8"
```
the first number "412" is the tempo that we going to work with, the second number is the tune of "265 Hz", the last number is "4" and this is set the sound delay, so number "8" is two time longer than "4"

and this is my code for "In the Hall of Mountain King":
```
GRUB_INIT_TUNE="714 123 4 138 4 146 4 164 4 185 4 146 4 185 8 174 4 138 4 174 8 164 4 130 4 164 8 123 4 138 4 146 4 164 4 185 4 146 4 185 4 246 4 220 4 185 4 146 4 185 4 220 8"
```

please remember that after you setup the grub you mast type the command "update-grub" for the setting will take affects
more cool song to the grub:

Super Mario:

```
GRUB_INIT_TUNE="1000 334 1 334 1 0 1 334 1 0 1 261 1 334 1 0 1 392 2 0 4 196 2"
```

Star Wars Imperial Death March:
```
GRUB_INIT_TUNE="480 440 4 440 4 440 4 349 3 523 1 440 4 349 3 523 1 440 8 659 4 659 4 659 4 698 3 523 1 415 4 349 3 523 1 440 8"
```

Raining Blood:
```
GRUB_INIT_TUNE="640 165 4 165 4 165 4 554 2 587 2 554 4 370 2 554 2 523 4 349 2 523 2 494 8 165 4 165 4 165 4"
```
Mario Bros. Mushroom Powerup:
```
GRUB_INIT_TUNE="1750 523 1 392 1 523 1 659 1 784 1 1047 1 784 1 415 1 523 1 622 1 831 1 622 1 831 1 1046 1 1244 1 1661 1 1244 1 466 1 587 1 698 1 932 1 1195 1 1397 1 1865 1 1397 1"
```

Fuer Elise:
```
GRUB_INIT_TUNE="480 420 1 400 1 420 1 400 1 420 1 315 1 370 1 335 1 282 3 180 1 215 1 282 1 315 3 213 1 262 1 315 1 335 3 213 1 420 1 400 1 420 1 400 1 420 1 315 1 370 1 335 1 282 3 180 1 215 1 282 1 315 3 213 1 330 1 315 1 282 3"
```
