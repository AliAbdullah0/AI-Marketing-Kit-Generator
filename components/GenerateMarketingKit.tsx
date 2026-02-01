"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Loader2, Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { processAIGeneration } from '@/actions/ai.actions'

const GenerateMarketingKit = ({kitId}:{kitId:string}) => {
    const [loading, setLoading] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [progress, setProgress] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (!kitId) {
            toast.error("Marketing kit ID is missing")
            router.push('/create')
        }
    }, [kitId, router])

    const handleGenerate = async () => {
        if (!kitId) {
            toast.error("Marketing kit ID is missing")
            return
        }

        setGenerating(true)
        setLoading(true)
        setProgress(0)

        try {
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev
                    return prev + 5
                })
            }, 1000)


            clearInterval(progressInterval)
            setProgress(100)

            const res = await processAIGeneration(kitId)

            console.log(res)

            if (res?.status === 201) {
                toast.success(res.message || "Marketing kit generated successfully!")
                setTimeout(() => {
                    router.push(`/preview/${res.generatedKitId}`)
                }, 1500)
            } else {
                toast.error(res?.message || "Failed to generate marketing kit")
                setGenerating(false)
            }
        } catch (error: any) {
            toast.error(error?.message || "An error occurred during generation")
            setGenerating(false)
        } finally {
            setGenerating(false)
            setLoading(false)
        }
    }

    if (!kitId) {
        return null
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='w-full max-w-md p-6'>
                <div className='flex flex-col gap-6 items-center text-center'>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='relative'>
                            <Sparkles className='h-16 w-16 text-primary animate-pulse' />
                            {generating && (
                                <Loader2 className='h-8 w-8 text-primary animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                            )}
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold mb-2'>
                                {generating ? 'Generating Your Marketing Kit' : 'Ready to Generate'}
                            </h2>
                            <p className='text-muted-foreground'>
                                {generating 
                                    ? 'Our AI is creating personalized marketing content for your business. This may take a few moments...'
                                    : 'Click the button below to generate your complete marketing kit with AI-powered content.'
                                }
                            </p>
                        </div>
                    </div>

                    {generating && (
                        <div className='w-full space-y-2'>
                            <div className='flex justify-between text-sm text-muted-foreground'>
                                <span>Generating content...</span>
                                <span>{progress}%</span>
                            </div>
                            <FieldDescription className='text-center'>
                                Creating analysis, content, brand identity, and business profile...
                            </FieldDescription>
                        </div>
                    )}

                    {!generating && (
                        <div className='w-full space-y-4'>
                            <Field>
                                <FieldDescription>
                                    Your marketing kit will include:
                                </FieldDescription>
                                <ul className='text-left space-y-2 mt-4 text-sm text-muted-foreground'>
                                    <li>• Customer Persona & Competitor Analysis</li>
                                    <li>• Social Media Posts & Content Calendar</li>
                                    <li>• Product Descriptions & Ad Copy</li>
                                    <li>• Logo Ideas & Brand Guidelines</li>
                                    <li>• Mission Statement & Brand Story</li>
                                </ul>
                            </Field>
                        </div>
                    )}

                    <Button 
                        onClick={handleGenerate} 
                        disabled={loading || generating}
                        size="lg"
                        className='w-full'
                    >
                        {generating ? (
                            <span className="flex gap-2 items-center justify-center">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Generating...
                            </span>
                        ) : (
                            <span className="flex gap-2 items-center justify-center">
                                <Sparkles className="h-4 w-4" />
                                Generate Marketing Kit
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GenerateMarketingKit
