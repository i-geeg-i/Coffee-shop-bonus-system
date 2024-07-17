'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../supabase/server'

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
    return("Error: " + error.status)
  }

  revalidatePath('/', 'layout')
  redirect('/account')

}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string
  }

  const { error } = await supabase.auth.signUp(data);


  if (error?.status == 422) {
    return("Password should be at least 6 characters.")
  } else if (error) {
      return("Error: " + error.status)
    } else {
      const id = (await supabase.auth.getUser()).data.user?.id;

      await supabase.from('profiles').update({full_name: data.name}).eq("id", id)
      revalidatePath('/', 'layout')
      redirect('/account')
    }

 
}
