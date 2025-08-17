import { useState } from 'react';
import { Shield, Upload, Zap, Users, CheckCircle, Star, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Shield,
      title: "Advanced AI Detection",
      description: "Industry-leading deepfake detection powered by Reality Defender API with 99.2% accuracy rate."
    },
    {
      icon: Upload,
      title: "Multi-Format Support",
      description: "Analyze images, videos, and audio files up to 200MB with real-time processing."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds with our optimized processing pipeline and smart caching."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share results securely with your team and export detailed PDF reports."
    }
  ];

  const stats = [
    { value: "1M+", label: "Files Analyzed" },
    { value: "99.2%", label: "Accuracy Rate" },
    { value: "50K+", label: "Happy Users" },
    { value: "<2s", label: "Avg Processing" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Cybersecurity Manager",
      company: "TechCorp",
      content: "DeepGuard has revolutionized how we verify media authenticity. The accuracy is incredible!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Digital Forensics Expert",
      company: "SecureMedia",
      content: "The fastest and most reliable deepfake detection platform I've ever used.",
      rating: 5
    },
    {
      name: "Dr. Lisa Wang",
      role: "AI Researcher",
      company: "University Labs",
      content: "Perfect for academic research with detailed analysis reports and high precision.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold gradient-text">DeepGuard</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors link-animated">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors link-animated">Pricing</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors link-animated">About</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="btn-ghost-hero">Sign In</Button>
            <Button className="btn-hero">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-lg animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-accent/10 rounded-full animate-float" style={{animationDelay: '4s'}} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="animate-slide-up">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Detect <span className="gradient-text">Deepfakes</span> with
                <br />AI Precision
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Professional deepfake detection platform powered by Reality Defender API. 
                Analyze images, videos, and audio with 99.2% accuracy in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="btn-hero text-lg px-8 py-6">
                  Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="btn-ghost-hero text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  50 free analyses/month
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  No credit card required
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="animate-fade-in">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="DeepGuard AI Detection Interface" 
                  className="w-full h-auto rounded-3xl shadow-2xl animate-glow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to detect and analyze deepfakes with professional-grade accuracy
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`glass-card p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  activeFeature === index ? 'ring-2 ring-primary shadow-[var(--shadow-glow)]' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Trusted by <span className="gradient-text">Professionals</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users say about DeepGuard
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card p-8">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start analyzing your media files today with 50 free detections per month
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="btn-hero text-lg px-8 py-6">
              Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="btn-ghost-hero text-lg px-8 py-6">
              View Documentation
            </Button>
          </div>
          
          <Card className="glass-card-elevated p-8 max-w-md mx-auto">
            <CardContent className="p-0">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Free Tier</h3>
                <div className="text-4xl font-bold gradient-text mb-4">$0</div>
                <div className="text-muted-foreground mb-6">Perfect for getting started</div>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3" />
                    50 analyses per month
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3" />
                    All file formats supported
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3" />
                    Basic reporting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3" />
                    Email support
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold gradient-text">DeepGuard</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 DeepGuard. All rights reserved. Powered by Reality Defender API.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;