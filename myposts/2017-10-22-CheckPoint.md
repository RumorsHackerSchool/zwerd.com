---
layout: post
title: CheckPoint
excerpt: "Ok... so... for guy that write how to migrate from CheckPoint to PaloAlto is difficult to write again about checkpoint, but I think that checkpoint have some good stuff that we can play with and to learn from this stuff, so this is why I write this article, first of all I want to memorize myself the knowledge I have learn for my CCSA certification and to share it with you guys."
tags:
- CheckPoint

---

CheckPoint have something that called SMART Architecture, that stand for Security Mgmt. Architerctor(SMART), and that architecture contain three stuff:
- **console** that is the PC that connect to implying and configuring the organization policy.
- **Managment** which is a box that responsible for policies and implement them on the firewalls in the network.
- **Gateway (FW)** this is the firewall that the policies apply on it, so that is the force point of the policies of the management server.

The principle in that architecture is simple, the policies will be manage on other box than the FW server, and in the FW server we only enforce that policy, no one can setup policies on the FW then the management, so keep in mine that every time we will setup some new rule we will configure it on the managment and after that we will apply it on the FW itself.

If we look on the traffic control method we have three main methods that CheckPoint work with:
- **packets filtering** which enforce the policies of the FW, which mean that only traffic that allowed on the FW to transfer, that is the only traffic that will be transfer, that mean if we have a policy that allow all traffic within the network to be transfered to the external, in that case traffic will allow to transfer in that direction only, so on body from the external will allowed to go inside to the internal, so in short packets filtering is basically said this packets are allow and this packets are doesn't, and the default operation is deny every traffic through the firewall, that mean that if you want to allow some traffic you must set it up on the FW with the management server.
- **Stateful** which mean that if some packet from the internal travel to the external we will allow only that traffic to go back because we know that the traffic start from the internal network. It we was implement the network to work only with Packet Filtering we was in trouble because we will be must allow any traffice in any direction, so this is the place that stateful inspection come along. Every traffic will record in some state table done by INSPECT engine and if the traffic that transffer from internal and come back to the FW and it is perfect it will allow to go foreword from the external to internal which mean for example if some one from the internal sent SYN to someone else we will expect to receive some SYN+ACK from the same someone that on the external, so in some case this traffic are allow by the stateful.
- **App. Awareness** is the way that the FW will know what is the type of the traffic which mean that the firewall know what is the application, as an example if the traffic is http, then we allow it to transfer, but if the traffic isn't http it's just telnet traffic that used port 80 we will disallow that, that mean the firewall knows how the application look like and base on that we can setup some rull that allow or deny some sort of traffic. So you may ask is it mean that the firewall look in every packets in digging to the application layer of that packet? so the  answer is no, the firewall allow that traffic to go along base on the first packets that arrived, if that packets contain legitimate application it will be transfer and record in the state table of INSPECT engine.

This days the operation of the checkpoint called GAiA, in the passed it was IPSO and after that it was SecurePlatform (SPLAT), the GAiA is linux base so if you know linux then you are ready to go.


**Highlights**:
If we setup the firewall and the management in the same boxes, this implementation are called **Standalone**, if the management server and the firewall server are separated, this is called **Distributed** implementation.
If we setup more that one firewall in the core, in that case we can set it as High Availability. we also can use the firewall as **Routed** device or as **Bridged** device, this mean that if we work in Routed mode the firewall will separate broadcast domain and if we used in Bridged mode the firewall can still to look through the packet up to application layer but in that mode we doesn't need to setup separated IP addresses for every port, which mean the firewall also doesn't separated broadcast domains.

I will setup CheckPoint firewall lab with R76 because that what I have (original disk), so for the brouser of today there is some issue  `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` so if you setup the machine and trying to connect them with you browser probably you will see this error, this error is related to some issue called SSL/TLS compression [CVE-2012-4929](http://cve.mitre.org/cgi-bin/cvename.cgi?name=cve-CVE-2012-4929), so if you have some updated version of GAiA I think that you will not face with that issue, in my case I downgrade the IE browser and it work for me.

**there will be a continue.**
