'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error?.status === 400) {
    return("Wrong email or password")

  } else if (error){
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')

}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)


  if (error?.status == 422) {
    return(alert("Password should be at least 6 characters."))
  } else if (error?.status === 429) {
      // alert("Check your email")
      redirect('/emailIsSent')
    } else if (error) {
      redirect('/error')
    } else {
      revalidatePath('/', 'layout')
      redirect('/account')
    }

 
}
