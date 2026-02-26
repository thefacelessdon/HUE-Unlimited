import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            HUE UNLIMITED
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Creating content that connects and impacts youth culture through authentic storytelling
          </p>
          <Link to="/hue-unlimited">
            <Button size="lg" className="text-lg px-8 py-6">
              View Case Study
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Case Study Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative group cursor-pointer">
              <Link to="/hue-unlimited" className="absolute inset-0 flex items-center justify-center bg-background/20 group-hover:bg-background/10 transition-colors">
                <Play className="w-16 h-16 text-primary" />
              </Link>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Frequency Campaign</h3>
              <p className="text-muted-foreground text-lg mb-6">
                How we helped brands connect with the most marketing-adverse generation in history through authentic cultural storytelling and community engagement.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">+340%</div>
                  <div className="text-sm text-muted-foreground">Engagement Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15M+</div>
                  <div className="text-sm text-muted-foreground">Reach Achieved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">92%</div>
                  <div className="text-sm text-muted-foreground">Brand Favorability</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
