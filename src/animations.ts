export const cardAnimation = {
    left: {
        zIndex: -100,
        x: '-2%',
        scale: 0.9,
        rotate: -10,
    },
    center: {
        zIndex: 0,
        x: 0,
        scale: 1,
        rotate: 0,
    },
    right: {
        zIndex: -100,
        x: '2%',
        scale: 0.9,
        rotate: 10,
    },

}

export const welcomeAnimations = {
    hidden: {
        opacity: 0,
        transform: 'rotate(10deg)',
    },
    visible: {
        opacity: 1,
        transform: 'rotate(0deg)',
    }
};

export const paragraphAnimations = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
    }
}

export const linkAnimations = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    visible: {
        opacity: 1,
        x: 0,
    }
}

export const loadingAnimation = {
    animateLeft: {
        width: ['0%', '60%', '0%']
    },
    animateRight: {
        width: ['60%', '0%', '60%']
    },
    dots: {
        opacity: [0, 1, 0]
    }
}

export const textAnimation = {
    topTextAnimation: {
        rest: {
            y: 0
        },
        hover: {
            y: "-110%",
            transition: {
                duration: 0.3,
                ease: [0.6, 0.01, 0.05, 0.95]
            },
            type: "tween",
        }
    },
    bottomTextAnimation: {
        rest: {
            y: "110%"
        },
        hover: {
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.6, 0.01, 0.05, 0.95]
            },
            type: "tween",
        }
    }
}


export const codeAnimation = {
    hidden: {
        opacity: 0,
        y: -100,
    },
    visible: {
        opacity: 1,
        y: 0,
    }
}