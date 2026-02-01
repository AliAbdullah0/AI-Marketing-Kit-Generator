"use client"
import { createMarketingKit } from '@/actions/marketingKit.actions'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const CreateMarketingKit = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setLoading(true)
        try {
            const formData = new FormData(e.currentTarget)
            const name = formData.get("name") as string
            
            if (!name || name.trim() === '') {
                toast.error("Please enter a kit name")
                setLoading(false)
                return
            }
            
            const res = await createMarketingKit(name);
            
            if (res?.status === 201) {
                toast.success(res.message)
                if (res.kitId) {
                    router.push(`/fill/${res.kitId}`)
                }
            } else {
                toast.error(res?.message)
            }
        } catch (error: any) {
            toast.error(error?.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className='flex items-center justify-center '>     
                <div className='w-max-md p-6 '>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <Field className='space-y-2'>
                            <FieldLabel htmlFor='name'>
                                Kit Name
                            </FieldLabel>
                            <Input type='text' name='name' placeholder='Acme Inc.' required></Input>
                        </Field>
                        <FieldDescription>
                            This name can be changed later.
                        </FieldDescription>
                        <Button type="submit" disabled={loading}>{
                            loading ? <span className="flex gap-1 items-center justify-center"><Loader2 className="h-4 w-4 animate-spin" /> Creating...</span> : "Create"
                        }</Button>
                    </form>
                </div>
        </div>
    )
}

export default CreateMarketingKit