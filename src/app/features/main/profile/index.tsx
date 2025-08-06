"use client"

import Image from "next/image"
import { Camera, Edit, Ellipsis,MapPinned,Menu, Phone, Plus, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Using Avatar for profile pic base
import { BottomNavBar } from "@/components/bottom-navbar";
import { ProfileData } from "./type"

interface ProfileScreenProps {
  data?: any
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-gray-900 px-4 shadow-md">
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-white" />
          <span className="text-lg font-semibold">11:39</span>
          {/* Moon icon not directly available in Lucide, using a placeholder or omitting */}
        </div>
        <div className="flex items-center gap-4">
          <Edit className="h-6 w-6 text-white" />
          <Search className="h-6 w-6 text-white" />
          <User className="h-6 w-6 text-white" />
        </div>
      </header>

      {/* Profile Header Section */}
      <div className="relative bg-gray-900 pb-4">
        {/* Cover Photo */}
        <div className="relative h-48 w-full bg-gray-800">
          <Image
            src="/placeholder.svg?height=192&width=768"
            alt=""
            layout="fill"
            objectFit="cover"
            className="rounded-b-lg"
          />
          <Button className="absolute bottom-4 right-4 bg-gray-700 text-white hover:bg-gray-600">
            <Camera className="mr-2 h-4 w-4" />
            Add cover photo
          </Button>
        </div>

        {/* Profile Picture and Info */}
        <div className="relative -mt-16 px-4">
          <div className="relative w-32 h-32 rounded-full border-4 border-gray-900 bg-gray-700 ml-4">
            <Avatar className="w-full h-full">
              <AvatarImage src={data?.profile} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-white">
              <Camera className="h-4 w-4" />
            </div>
            {/* Thinking about... bubble */}
            {/* <div className="absolute -top-10 left-1/4 -translate-x-1/2 transform rounded-full bg-gray-700 px-4 py-2 text-sm text-white whitespace-nowrap">
              Thinking about...
            </div> */}
          </div>

          <div className="mt-4 text-left ml-4">
            <h1 className="text-2xl font-bold gap-2">
             {data?.name}
            </h1>
            <div className="flex py-2"> 
              <MapPinned className="h-4 w-4 text-gray-400" />
              <p className="text-gray-400 pl-2 text-sm"> {data?.location}</p>
            </div>
            <div className="flex py-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <p className="text-gray-400 pl-2 text-sm"> {data?.phoneNumber}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-start gap-2 ml-4">
            <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add to story
            </Button>
            <Button className="flex-1 bg-gray-700 text-white hover:bg-gray-600">
              <Edit className="mr-2 h-4 w-4" /> Edit profile
            </Button>
            <Button className="bg-gray-700 text-white hover:bg-gray-600 px-4">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

  

      {/* Details Section */}
      <div className="mx-4 mt-4">
        <h2 className="text-xl font-bold">Details</h2>
        <div className="mt-2 flex items-center gap-2 text-gray-400">
          <Ellipsis className="h-5 w-5" />
          <a href="#" className="hover:underline">
            See your About info
          </a>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="flex aspect-[2/3] flex-col items-center justify-center rounded-lg bg-gray-800 p-2 text-gray-400">
            <Plus className="h-8 w-8" />
            <span className="mt-2 text-sm">New</span>
          </div>
          <div className="relative aspect-[2/3] rounded-lg bg-gray-800">
            <Image
              src="/placeholder.svg?height=200&width=133"
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
              + 11
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  )
}
