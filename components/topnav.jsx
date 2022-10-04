import { useState } from "react"

export default function TopNav() {
    const [active, setActive] = useState(true)
    return (
        <div className="flex h-12 w-full bg-primary flex-row gap-4 box-border items-center ">
            <div style={{minWidth:"70vw"}} className="">
                <a href="" className={`pl-4 pb-3 pr-4 text-sm font-semibold ${(active ? "border-blue-600 border-b-2": "")} `}>Overview</a>
                <a href="" className="pl-4 pr-4 text-sm font-semibold">Settings</a>
            </div>
        </div>
    )
}