"use client"
import { useState } from 'react'
import { Field, FieldDescription, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'
import { createNewKit } from '../actions/marketingKit.actions'

const FillMarketingKit = ({kitId}:{kitId:string}) => {
    const [loading,setLoading] = useState(false);
    const [industry,setIndustry] = useState<string>('')
    const [services,setServices] = useState<string[]>([''])
    const [products,setProducts] = useState<string[]>([''])
    const [style,setStyle] = useState<string>('')
    const router = useRouter()
    const [tone,setTone] = useState<string>('')

    const addProduct = ()=>{
        setProducts([...products,''])
    }
    const removeProduct = (index:number)=>{
        setProducts(products.filter((_,i)=>i!==index))
    }
    const updateProduct = (i:number,value:string)=>{
        const updated = [...products]
        updated[i] = value
        setProducts(updated)
    }

    const addService = ()=>{
        setServices([...services,''])
    }

    const removeService = (index:number)=>{
        setServices(services.filter((_,i)=> i !== index))
    }

    const updateService = (index: number, value: string) => {
        const updated = [...services]
        updated[index] = value
        setServices(updated)
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData(e.currentTarget)
            const businessName = formData.get("buisnessName") as string
            const targetAudience = formData.get("targetAudience") as string
            const region = formData.get("region") as string
            const features = formData.get("features") as string
            const benefits = formData.get("benefits") as string

            const validProducts = products.filter(p=>p.trim() !== '')
            const validServices = services.filter(s => s.trim() !== '')

            if(!businessName || !targetAudience || !region || !features || !benefits){
                // toast.error("")
                setLoading(false)
                return
            }

            const res = await createNewKit(kitId, {
                businessName,
                targetAudience,
                industry,
                region,
                features,
                benefits,
                products:validProducts,
                services:validServices,
                style,
                tone
            })

            if(res?.status === 201){
                toast.message(res.message)
                router.push(`/generate/${res.kitId}`)
            }
        } catch (error:any) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex items-center justify-center'>
        <div className='w-full max-w-md p-6'>
            <form action="" className='flex flex-col gap-1' onSubmit={handleSubmit}>
                <Field className='space-y-2 '>
                    <FieldLabel htmlFor='buisnessName'>
                        Buisness Name *
                    </FieldLabel>
                    <Input
                    required
                    type='text'
                    name='buisnessName'
                    placeholder='Acme Inc.'
                    />
                </Field>
                <Field className='space-y-2'>
                    <FieldLabel htmlFor='industry'>
                        Industry *
                    </FieldLabel>
                    <Select value={industry} onValueChange={setIndustry} required>
                        <SelectTrigger id='industry'>
                            <SelectValue placeholder="Select your industry"/>
                            <SelectContent>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="food">Food & Beverage</SelectItem>
                                <SelectItem value="fashion">Fashion</SelectItem>
                                <SelectItem value="real-estate">Real Estate</SelectItem>
                                <SelectItem value="consulting">Consulting</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                </Field>
                <Field className='space-y-2'>
                    <FieldLabel>Products</FieldLabel>
                    {
                        products.map((product,index)=>(
                            <div key={index} className='flex gap-2'>
                                <Input
                                type='text'
                                placeholder={`Product ${index + 1}`}
                                value={product}
                                onChange={(e)=>updateProduct(index,e.target.value)}
                                />
                                {product.length > 1 && (
                                    <Button type="button" variant={'outline'} onClick={()=>removeProduct(index)}>Remove</Button>
                                )}
                            </div>
                        ))}
                        <Button
                        type='button'
                        variant={'outline'}
                        onClick={addProduct}
                        className='w-fit'
                        >
                            + Add Product
                        </Button>
                </Field>
                <Field className='space-y-2'>
                        <FieldLabel>Services</FieldLabel>
                        {services.map((service, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    type='text'
                                    placeholder={`Service ${index + 1}`}
                                    value={service}
                                    onChange={(e) => updateService(index, e.target.value)}
                                />
                                {services.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => removeService(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addService}
                            className="w-fit"
                        >
                            + Add Service
                        </Button>
                    </Field>
                    <Field className='space-y-2'>
                        <FieldLabel htmlFor='tone'>
                            Brand Tone *
                        </FieldLabel>
                        <Select value={tone} onValueChange={setTone} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select brand tone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="friendly">Friendly</SelectItem>
                                <SelectItem value="formal">Formal</SelectItem>
                                <SelectItem value="playful">Playful</SelectItem>
                                <SelectItem value="authoritative">Authoritative</SelectItem>
                                <SelectItem value="conversational">Conversational</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className='space-y-2'>
                        <FieldLabel htmlFor='style'>
                            Brand Style *
                        </FieldLabel>
                        <Select value={style} onValueChange={setStyle} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select brand style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="modern">Modern</SelectItem>
                                <SelectItem value="classic">Classic</SelectItem>
                                <SelectItem value="minimalist">Minimalist</SelectItem>
                                <SelectItem value="bold">Bold</SelectItem>
                                <SelectItem value="elegant">Elegant</SelectItem>
                                <SelectItem value="creative">Creative</SelectItem>
                                <SelectItem value="corporate">Corporate</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className='space-y-2'>
                        <FieldLabel htmlFor='targetAudience'>
                            Target Audience *
                        </FieldLabel>
                        <Textarea
                            name='targetAudience'
                            placeholder='Describe your target audience (e.g., Young professionals aged 25-35, interested in technology and innovation)'
                            required
                            rows={4}
                        />
                        <FieldDescription>
                            Be specific about demographics, interests, and behaviors
                        </FieldDescription>
                    </Field>
                    <Field className='space-y-2'>
                        <FieldLabel htmlFor='features'>
                            Features *
                        </FieldLabel>
                        <Textarea
                            name='features'
                            placeholder='Describe your buisness features.'
                            required
                            rows={2}
                        />
                    </Field>
                    <Field className='space-y-2'>
                        <FieldLabel htmlFor='benefits'>
                            Benefits *
                        </FieldLabel>
                        <Textarea
                            name='benefits'
                            placeholder='Explain why people should choose your business.'
                            required
                            rows={2}
                        />
                    </Field>
                    <Field className='space-y-2'>
                        <FieldLabel htmlFor='region'>
                            Region *
                        </FieldLabel>
                        <Input
                            name='region'
                            placeholder='e.g Islamabad, Pakistan'
                            required
                        />
                    </Field>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <span className="flex gap-1 items-center justify-center">
                                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                            </span>
                        ) : (
                            "Continue"
                        )}
                    </Button>
            </form>
        </div>
    </div>
  )
}

export default FillMarketingKit