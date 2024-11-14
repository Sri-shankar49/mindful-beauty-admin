// import { useState } from "react"
// import { SelectField } from "@/common/SelectField"
// import { Button } from "@/common/Button"
// import { AreaChart } from "@/components/Dashboard/DashBoardData/AreaChart"
// import { BarChart } from "@/components/Dashboard/DashBoardData/BarChart"
// import { RangeChart } from "@/components/Dashboard/DashBoardData/RangeChart"
// import { DenialPopup } from "@/components/Dashboard/DashBoardData/DenialPopup"
// import { StylistPopup } from "@/components/Dashboard/DashBoardData/StylistPopup"
// import Select, { SingleValue } from 'react-select';
// import stylist from "../assets/images/stylist.png"
// import { DashBoardData } from "@/components/Dashboard/DashBoardData"
import { Outlet } from "react-router-dom"


export const Dashboard = () => {

  return (
    <div className="">
      <div className="bg-mindfulLightPink h-dvh px-5 py-5" >

        <div className="bg-mindfulWhite px-5 py-5">

          {/* <DashBoardData /> */}

          <Outlet />
        </div>

      </div>
    </div>
  )
}
