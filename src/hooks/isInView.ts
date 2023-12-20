import { useRef, useState, useEffect, RefObject } from 'react';

type useInViewType = {
    inView: boolean
    ref: RefObject<any> | null,
    observe: (element: RefObject<any>, callback: (entries: IntersectionObserverEntry[]) => void) => IntersectionObserver | null,
    unObserve: (observer: IntersectionObserver) => void
}

const useInView = (): useInViewType => {
    const [inView, setInView] = useState(false)
    const containerRef = useRef(null)

    const callback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries
        setInView(entry.isIntersecting)
    }

    useEffect(() => {

        const _observer = new IntersectionObserver(callback, { threshold: 0.3 })
        if (containerRef.current) _observer.observe(containerRef.current)

        return () => {
            if (containerRef.current) _observer.unobserve(containerRef.current)
        }

    }, [containerRef])

    const observe = (element: RefObject<any>, callback: (entries: IntersectionObserverEntry[]) => void) => {
        const _observer = new IntersectionObserver(callback, { threshold: 0.7 })
        containerRef.current = element.current

        return _observer
    }

    const unObserve = (observer: IntersectionObserver) => {
        if (containerRef.current) observer.unobserve(containerRef.current)
    }

    return {
        inView,
        ref: containerRef,
        observe,
        unObserve
    }
}

export default useInView;