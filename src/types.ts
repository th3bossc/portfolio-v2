import React from "react";
import { IconName, IconPrefix } from "@fortawesome/free-brands-svg-icons";


export interface linksInterface {
    name: string,
    href: string,
    iconType?: IconPrefix,
    icon?: IconName,
}

export interface chipInterface {
    iconType: IconPrefix,
    icon: IconName,
    tooltip: string,
}

export interface projectsInterface {
    title: string,
    id: number | string,
    description: string,
    time: string,
    mainLink: string,
    chips: chipInterface[],
    links: linksInterface[],
}

export interface techStackInterface {
    iconType: IconPrefix,
    icon: IconName,
    tooltip: string,
}
