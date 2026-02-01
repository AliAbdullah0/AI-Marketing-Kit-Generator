"use client"

import { usePathname } from "next/navigation"
import GradientText from "../GradientText";
import AnimatedContent from "../AnimatedContent";

const CreateParam = () => {
    return (
        <div className="w-full text-emerald-500 backdrop-blur-md relative bg-black min-h-screen flex items-center justify-center">
            <div className="flex items-center flex-col gap-2 p-4">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={1.5}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0.3}
                >
                    <GradientText
                        colors={["#5227FF", "#0B8F4D", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-5xl font-extrabold w-3/4"
                    >
                        Start By Giving Your Kit a Cool Name.
                    </GradientText>
                </AnimatedContent>
            </div>
        </div>
    )
}

const FillParam = () => {
    return (
        <div className="w-full text-emerald-500 backdrop-blur-md relative bg-black min-h-screen flex items-center justify-center">
            <div className="flex items-center flex-col gap-2 p-4">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={1.5}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0.3}
                >
                    <GradientText
                        colors={["#5227FF", "#0B8F4D", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-5xl font-extrabold w-3/4"
                    >
                        Tell Us About Your Business.
                    </GradientText>
                </AnimatedContent>
            </div>
        </div>
    )
}

const GenerateParam = () => {
    return (
        <div className="w-full text-emerald-500 backdrop-blur-md relative bg-black min-h-screen flex items-center justify-center">
            <div className="flex items-center flex-col gap-2 p-4">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={1.5}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0.3}
                >
                    <GradientText
                        colors={["#5227FF", "#0B8F4D", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-5xl font-extrabold w-3/4"
                    >
                        Let AI Create Your Marketing Magic.
                    </GradientText>
                </AnimatedContent>
            </div>
        </div>
    )
}

const FormsSide = () => {
    const pathname = usePathname();
    
    if (pathname?.includes('/generate')) {
        return <GenerateParam />
    }
    
    if (pathname?.includes('/fill')) {
        return <FillParam />
    }
    
    if (pathname?.includes('/create')) {
        return <CreateParam />
    }
    
    return <CreateParam />
}

export default FormsSide