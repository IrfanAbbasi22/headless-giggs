'use client'
 
import { useRouter } from 'next/navigation'

const Payment = () => {
    const router = useRouter();
    console.log('router', router)

    window.setTimeout(()=>{
        router.push('/thanks');
        // window.location.href = '/thanks';
    }, 1500)

    return (
        <>
            <div className='h-dvh'>
                <button type="button" onClick={() => router.push('/dashboard')}>
                    Dashboard
                </button>
            </div>
        </>
    )
}

export default Payment