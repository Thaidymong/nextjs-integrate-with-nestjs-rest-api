// "use client"

// import { useState, useTransition } from "react"
// import { useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Eye, EyeOff, Loader2 } from "lucide-react"
// import { cn } from "@/lib/utils"
// // import { type LoginFormValues, loginSchema } from "./schema" // Corrected import path for schema
// import { toast } from "sonner"
// import Image from "next/image"
// import { login } from "../actions/login"
// import { LoginFormValues, loginSchema } from "../schema"

// export const LoginScreen = () => {
//   const router = useRouter()
//   const [showPassword, setShowPassword] = useState(false)
//   const [isPending, startTransition] = useTransition()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//   })

//   const onSubmit = (input: LoginFormValues) => {
//     startTransition(async () => {
//       const { data, error } = await login(input)
//       if (data?.accessToken) {
//         router.push("/")
//         router.refresh()
//       } else if (error) {
//         toast.error(error.message, {
//           duration: 5000,
//           position: "top-right",
//           style: {
//             fontSize: "11pt",
//             fontFamily: "koh_santepheap, 'Noto Sans Khmer', sans-serif",
//           },
//         })
//       }
//     })
//   }

//   return (
//     <div className="relative flex min-h-screen flex-col bg-background px-4 md:px-6">
//       <main className="flex flex-1 items-center">
//         <div className="mx-auto w-full max-w-[400px] space-y-6">
//           <div className="flex items-center justify-center">
//             <Image
//               src="/logo.jpg" // Placeholder for logo.jpg
//               alt="Next.js Logo"
//               width={100} // Adjusted width/height for placeholder
//               height={100}
//               priority
//               className="mb-4 h-[100%] w-[30%]"
//             />
//           </div>
//           <div className="space-y-2 text-center">
//             <h1 className="text-2xl font-bold md:text-3xl">Aura</h1>
//             <p className="text-sm text-muted-foreground md:text-base">Welcome to our Next.js App</p>
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="space-y-2">
//               <Input
//                 type="email" // Changed type to email
//                 placeholder="username" // Changed placeholder to email
//                 className={cn("h-12", {
//                   "border-destructive": errors.username, // Changed from username to email
//                 })}
//                 {...register("username")} // Changed from username to email
//               />
//               {errors.username && ( // Changed from username to email
//                 <p className="text-xs text-destructive">{errors.username.message}</p>
//               )}
//             </div>
//             <div className="space-y-2">
//               <div className="relative">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="password"
//                   className={cn("h-12 pr-12", {
//                     "border-destructive": errors.password,
//                   })}
//                   {...register("password")}
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </Button>
//               </div>
//               {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
//             </div>
//             <Button
//               type="submit"
//               className="h-12 w-full text-base font-medium text-white bg-[#04D939]"
//               disabled={isPending}
//             >
//               {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
//               Login {/* Changed button text from Signup to Login */}
//             </Button>
//           </form>
//         </div>
//       </main>
//       <footer className="p-4 text-center text-sm text-muted-foreground">&copy; 2025 All rights reserved</footer>
//     </div>
//   )
// }


"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Image from "next/image"
import { LoginFormValues, loginSchema } from "../schema"
import { login } from "../actions/login"

export const LoginScreen = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (input: LoginFormValues) => {
    startTransition(async () => {
      const { data, error } = await login(input)
      // Check for data.access_token from the nested data object
      if (data?.access_token) {
        // Changed from data?.accessToken to data?.access_token
        toast.success("Login successful!", {
          duration: 3000,
          position: "top-right",
        })
        router.push("/")
        router.refresh()
      } else if (error) {
        toast.error(error.message, {
          duration: 5000,
          position: "top-right",
          style: {
            fontSize: "11pt",
            fontFamily: "koh_santepheap, 'Noto Sans Khmer', sans-serif",
          },
        })
      }
    })
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background px-4 md:px-6">
      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="flex items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="Next.js Logo"
              width={100}
              height={100}
              priority
              className="mb-4 h-[100%] w-[30%]"
            />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold md:text-3xl">Aura</h1>
            <p className="text-sm text-muted-foreground md:text-base">Welcome to our Next.js App</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text" // Changed type to text for username
                placeholder="username" // Changed placeholder to username
                className={cn("h-12", {
                  "border-destructive": errors.username, // Changed from email to username
                })}
                {...register("username")} // Changed from email to username
              />
              {errors.username && ( // Changed from email to username
                <p className="text-xs text-destructive">{errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className={cn("h-12 pr-12", {
                    "border-destructive": errors.password,
                  })}
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            <Button
              type="submit"
              className="h-12 w-full text-base font-medium text-white bg-[#04D939]"
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Login
            </Button>
          </form>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">&copy; 2025 All rights reserved</footer>
    </div>
  )
}
