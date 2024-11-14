import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import userProfile from "../../assets/icons/userProfile.svg"
import { Button } from '@/common/Button';

export const ProfileProgress = () => {
    return (
        <div>
            <div>

                <div className="bg-mindfulWhite px-5 py-5">

                    {/* Progress Bars */}
                    <div className="grid grid-cols-3 gap-x-10 pb-16">
                        {/* General Information */}
                        <div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <h5 className="text-lg text-mindfulBlack font-semibold pb-2">General Information</h5>
                                    <p className="text-sm text-mindfulgrey">90%</p>
                                </div>
                            </div>
                            <ProgressBar
                                completed={90}
                                maxCompleted={100}
                                bgColor={"#fabc2a"}
                            // barContainerClassName="container"
                            // completedClassName="barCompleted"
                            // labelClassName="label"
                            />
                        </div>

                        {/* Bank Account Information */}
                        <div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <h5 className="text-lg text-mindfulBlack font-semibold pb-2">Bank Account Information</h5>
                                    <p className="text-sm text-mindfulgrey">40%</p>
                                </div>
                            </div>
                            <ProgressBar
                                completed={40}
                                maxCompleted={100}
                                bgColor={"#fabc2a"}
                            // barContainerClassName="container"
                            // completedClassName="barCompleted"
                            // labelClassName="label"
                            />
                        </div>

                        {/* Tax Information / GST Number*/}
                        <div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <h5 className="text-lg text-mindfulBlack font-semibold pb-2">Tax Information / GST Number</h5>
                                    <p className="text-sm text-mindfulgrey">10%</p>
                                </div>
                            </div>
                            <ProgressBar
                                completed={10}
                                maxCompleted={100}
                                bgColor={"#fabc2a"}
                            // barContainerClassName="container"
                            // completedClassName="barCompleted"
                            // labelClassName="label"
                            />
                        </div>
                    </div>

                    {/* Update your Profile Card */}
                    <div className="border-2 border-main rounded-lg px-20 py-20">
                        <div className="space-y-10">
                            {/* User Img */}
                            <div>
                                <img src={userProfile} alt="" className="w-fit mx-auto" />
                            </div>

                            {/* Content */}
                            <div>
                                <p className="text-md text-mindfulBlack text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum condimentum ullamcorper. Fusce luctus nisl vel odio egestas, eget accumsan tortor luctus. Aenean sollicitudin mauris orci, nec ultrices mauris auctor in. Proin tincidunt tortor lectus, eget finibus tellus sollicitudin sit amet.</p>
                            </div>

                            {/* Update Your Profile */}
                            <div className="text-center">
                                <Button 
                                buttonType="button"
                                buttonTitle={'Update Your Profile'}  
                                className="bg-main text-md text-mindfulWhite rounded-md px-5 py-1.5"                              
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
