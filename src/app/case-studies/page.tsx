import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";

export const metadata = {
  title: "Case Studies | HUE Unlimited",
  description: "How we help brands connect with culture through authentic storytelling.",
};

export default function CaseStudies() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            <span className="gradient-text">HUE UNLIMITED</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-neutral-400 md:text-2xl">
            Creating content that connects and impacts youth culture through
            authentic storytelling
          </p>
          <Link href="#frequency">
            <Button size="lg" className="px-8 py-6 text-lg">
              View Case Study
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Case Study Preview */}
        <div id="frequency" className="mx-auto max-w-4xl">
          <Card className="overflow-hidden">
            <div className="group relative aspect-video cursor-pointer bg-gradient-to-br from-hue-600/20 to-orange-500/20">
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/20 transition-colors group-hover:bg-neutral-950/10">
                <Play className="h-16 w-16 text-hue-400" />
              </div>
            </div>
            <div className="p-8">
              <h3 className="mb-4 text-2xl font-bold">Frequency Campaign</h3>
              <p className="mb-6 text-lg text-neutral-400">
                How we helped brands connect with the most marketing-adverse
                generation in history through authentic cultural storytelling and
                community engagement.
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">+340%</div>
                  <div className="text-sm text-neutral-400">
                    Engagement Increase
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">15M+</div>
                  <div className="text-sm text-neutral-400">Reach Achieved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">92%</div>
                  <div className="text-sm text-neutral-400">
                    Brand Favorability
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
