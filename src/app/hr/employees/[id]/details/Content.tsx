"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetEmployeeByIdQuery } from "@/redux/features/hr-api-slice";
import { Calendar, Camera, Mail, MapPin } from "lucide-react";
import BankDetail from "./BankDetail";
import ContactPerson from "./ContactPerson";
import Dependants from "./Dependants";
import Education from "./Education";
import Identification from "./Identification";
import NextofKin from "./NextofKin";
import Origin from "./Origin";
import Parent from "./Parent";
import PersonalDetails from "./PersonalDetails";
import Referees from "./Referees";
import ResidentialAddress from "./ResidentialAddress";
import WorkHistory from "./WorkHistory";

function Content({ id }: { id: number }) {
  const { data: employee } = useGetEmployeeByIdQuery(id);

  return (
    <div className="w-full min-h-screen py-0">
      {/* full-width container */}
      <div className="mx-auto w-full max-w-none   ">
        {/* Single Tabs wrapper for both columns */}
        <Tabs defaultValue="personal_details" className="w-full">
          {/* responsive grid: 1 col on mobile, 2 cols from md+ (1/4 + 3/4) */}
          <div className=" grid w-full grid-cols-1 gap-4  md:grid-cols-4">
            {/* LEFT COLUMN */}
            <div className="md:col-span-1 min-h-50 w-full">
              <Card className="h-full">
                <CardContent className="p-6 h-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={employee?.passport_photo ?? ""}
                          alt="Profile"
                        />
                        <AvatarFallback className="text-2xl"></AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                      >
                        <Camera />
                      </Button>
                    </div>

                    <div className="flex flex-col items-center space-y-2 text-center">
                      <h1 className="text-2xl font-bold">{employee?.names}</h1>

                      <div className="text-muted-foreground flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="size-4" />
                          {employee?.email}
                        </div>

                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {employee?.village_name}, {employee?.district_name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          Joined{" "}
                          {employee?.joining_date &&
                            new Date(employee.joining_date).toLocaleDateString(
                              "en-GB",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                        </div>
                      </div>
                    </div>
                    <Separator />

                    {/* Tabs Triggers */}
                    <TabsList className="flex flex-col w-full h-auto space-y-1 p-1  bg-white dark:bg-gray-950 rounded-md ">
                      <TabsTrigger
                        value="personal_details"
                        className="w-full justify-start"
                      >
                        Personal Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="residential_address"
                        className="w-full justify-start"
                      >
                        Residential Address
                      </TabsTrigger>
                      <TabsTrigger
                        value="place_of_origin"
                        className="w-full justify-start"
                      >
                        Place of Origin
                      </TabsTrigger>
                      <TabsTrigger
                        value="next_of_kin"
                        className="w-full justify-start"
                      >
                        Next of Kin
                      </TabsTrigger>
                      <TabsTrigger
                        value="contact_person"
                        className="w-full justify-start"
                      >
                        Contact Person
                      </TabsTrigger>
                      <TabsTrigger
                        value="parents"
                        className="w-full justify-start"
                      >
                        Parents
                      </TabsTrigger>
                      <TabsTrigger
                        value="identification"
                        className="w-full justify-start"
                      >
                        Identification
                      </TabsTrigger>
                      <TabsTrigger
                        value="bank_details"
                        className="w-full justify-start"
                      >
                        Bank Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="dependents"
                        className="w-full justify-start"
                      >
                        Dependents
                      </TabsTrigger>
                      <TabsTrigger
                        value="education_history"
                        className="w-full justify-start"
                      >
                        Education History
                      </TabsTrigger>
                      <TabsTrigger
                        value="work_history"
                        className="w-full justify-start"
                      >
                        Work History
                      </TabsTrigger>
                      <TabsTrigger
                        value="referees"
                        className="w-full justify-start"
                      >
                        Referees
                      </TabsTrigger>
                    </TabsList>

                    {/* Mobile Content */}
                    <div className="md:hidden mt-4 w-full">
                      <TabsContent value="personal_details" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Personal Details
                            </h3>
                            <Separator className="mb-3" />
                            {employee && (
                              <PersonalDetails employee={employee} />
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="residential_address" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Residential Address
                            </h3>
                            {employee && (
                              <ResidentialAddress employee={employee} />
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="place_of_origin" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Place of Origin
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <Origin employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="next_of_kin" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Next of Kin
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <NextofKin employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="contact_person" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Contact Person
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <ContactPerson employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="parents" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Parents
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <Parent employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="identification" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Identification
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <Identification employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="bank_details" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Bank Details
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <BankDetail employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="dependents" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Dependents
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <Dependants employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="education_history" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Education History
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <Education employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="work_history" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Work History
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <WorkHistory employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="referees" className="mt-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Referees
                            </h3>
                            <Separator className="mb-3" />
                            {employee && <Referees employee={employee} />}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN - Desktop Tabs Content */}
            <div className="hidden md:block md:col-span-3 min-h-50">
              <TabsContent value="personal_details" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Personal Details
                    </h3>
                    <Separator className="mb-3" />
                    {employee && <PersonalDetails employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="residential_address" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Residential Address
                    </h3>
                    <Separator className="mb-3" />
                    {employee && <ResidentialAddress employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="place_of_origin" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Place of Origin
                    </h3>
                    <Separator className="mb-3" />
                    {employee && <Origin employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="next_of_kin" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Next of Kin</h3>
                    <Separator className="mb-3" />
                    {employee && <NextofKin employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact_person" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Contact Person
                    </h3>
                    <Separator className="mb-3" />
                    {employee && <ContactPerson employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="parents" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Parents</h3>
                    <Separator className="mb-3" />
                    {employee && <Parent employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="identification" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Identification
                    </h3>
                    <Separator className="mb-3" />
                    {employee && <Identification employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bank_details" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
                    <Separator className="mb-3" />
                    {employee && <BankDetail employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dependents" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Dependents</h3>
                    <Separator className="mb-3" />
                    {employee && <Dependants employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education_history" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Education History
                    </h3>
                    <Separator className="mb-3" />
                    {employee && <Education employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="work_history" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Work History</h3>
                    <Separator className="mb-3" />
                    {employee && <WorkHistory employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="referees" className="h-full mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Referees</h3>
                    <Separator className="mb-3" />
                    {employee && <Referees employee={employee} />}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default Content;
