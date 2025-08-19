import TechStackBackend from "./tech-stack-backend";
import TechStackDeployment from "./tech-stack-deployment";
import TechStackFrontend from "./tech-stack-frontend";
import TechStackOverview from "./tech-stack-overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function TechStackContent() {

    return (
        <div className="mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Tech Stack & Architecture</h1>
            <Tabs defaultValue="overview" className="">
                <TabsList className="w-full">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="deployment">Deployment</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <TechStackOverview />
                </TabsContent>
                <TabsContent value="backend">
                    <TechStackBackend/>
                </TabsContent>
                <TabsContent value="frontend">
                    <TechStackFrontend/>
                </TabsContent>
                <TabsContent value="deployment">
                    <TechStackDeployment />
                </TabsContent>
            </Tabs>
        </div>
    );
}
