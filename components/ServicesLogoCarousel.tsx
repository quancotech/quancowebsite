"use client";

import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Card, CardContent } from "@/components/ui/card";

const servicesLogos = [
  { id: 1, name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { id: 2, name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { id: 3, name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { id: 4, name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { id: 5, name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { id: 6, name: "Vue.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { id: 7, name: "AWS", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { id: 8, name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
];

export function ServicesLogoCarousel() {
  return (
    <Card className="bg-gradient-to-br from-primary-bg/60 to-accent-blue/5 backdrop-blur-sm border border-accent-blue/20">
      <CardContent className="pt-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-white">
            The best are already here
          </h2>
        </div>
        <LogoCarousel logos={servicesLogos} columns={4} />
      </CardContent>
    </Card>
  );
}

