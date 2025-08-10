import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RefreshCw, User, Globe } from "lucide-react";
import { generateFakeIdentity } from "@/services/geminiService";
import { toast } from "sonner";

interface GeneratedIdentity {
  name: string;
  address: string;
  phone: string;
  email: string;
  birthday: string;
  age: string;
  ssn: string;
  mothersMaidenName: string;
  geoCoordinates: string;
  zodiac: string;
  username: string;
  password: string;
  website: string;
  creditCard: string;
  creditCardExpires: string;
  creditCardCvc: string;
  company: string;
  occupation: string;
  height: string;
  weight: string;
  bloodType: string;
  favoriteColor: string;
  vehicle: string;
  trackingNumber: string;
  guid: string;
}

const nameSets = [
  "American", "Arabic", "Australian", "Brazil", "Chechen (Latin)", "Chinese", 
  "Chinese (Traditional)", "Croatian", "Czech", "Danish", "Dutch", "England/Wales",
  "Eritrean", "Finnish", "French", "German", "Greenland", "Hispanic", "Hobbit",
  "Hungarian", "Icelandic", "Igbo", "Italian", "Japanese", "Japanese (Anglicized)",
  "Klingon", "Ninja", "Norwegian", "Persian", "Polish", "Russian", "Russian (Cyrillic)",
  "Scottish", "Slovenian", "Swedish", "Thai", "Vietnamese"
];

const countries = [
  "Australia", "Austria", "Belgium", "Brazil", "Canada", "Cyprus (Anglicized)",
  "Cyprus (Greek)", "Czech Republic", "Denmark", "Estonia", "Finland", "France",
  "Germany", "Greenland", "Hungary", "Iceland", "Italy", "Netherlands", "New Zealand",
  "Norway", "Poland", "Portugal", "Slovenia", "South Africa", "Spain", "Sweden",
  "Switzerland", "Tunisia", "United Kingdom", "United States", "Uruguay"
];

export default function NameGenerator() {
  const [gender, setGender] = useState<"male" | "female" | "random">("random");
  const [nameSet, setNameSet] = useState<string>("American");
  const [country, setCountry] = useState<string>("United States");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdentity, setGeneratedIdentity] = useState<GeneratedIdentity | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const identity = await generateFakeIdentity(gender, nameSet, country);
      setGeneratedIdentity(identity);
      toast.success("Identity generated successfully!");
    } catch (error) {
      toast.error("Failed to generate identity. Please try again.");
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Fake Name Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate realistic fake identities for testing and development
          </p>
        </div>

        {/* Generator Controls */}
        <Card className="mb-8 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Generator Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gender Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <Tabs value={gender} onValueChange={(value) => setGender(value as any)}>
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="male">Male</TabsTrigger>
                  <TabsTrigger value="female">Female</TabsTrigger>
                  <TabsTrigger value="random">Random</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Name Set and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Name Set
                </label>
                <Select value={nameSet} onValueChange={setNameSet}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {nameSets.map((set) => (
                      <SelectItem key={set} value={set}>
                        {set}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Country
                </label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full md:w-auto bg-gradient-primary hover:opacity-90 transition-all duration-300"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Identity
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Identity Display */}
        {generatedIdentity && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{generatedIdentity.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium">{generatedIdentity.age}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{generatedIdentity.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{generatedIdentity.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium break-all">{generatedIdentity.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Details */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Birthday</p>
                    <p className="font-medium">{generatedIdentity.birthday}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Zodiac</p>
                    <p className="font-medium">{generatedIdentity.zodiac}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">SSN</p>
                    <p className="font-medium">{generatedIdentity.ssn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mother's Maiden Name</p>
                    <p className="font-medium">{generatedIdentity.mothersMaidenName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-medium">{generatedIdentity.geoCoordinates}</p>
                </div>
              </CardContent>
            </Card>

            {/* Online Identity */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Online Identity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium">{generatedIdentity.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Password</p>
                    <p className="font-medium font-mono text-sm">{generatedIdentity.password}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-medium">{generatedIdentity.website}</p>
                </div>
              </CardContent>
            </Card>

            {/* Financial & Employment */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Financial & Employment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Credit Card</p>
                  <p className="font-medium font-mono">{generatedIdentity.creditCard}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Expires</p>
                    <p className="font-medium">{generatedIdentity.creditCardExpires}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CVC</p>
                    <p className="font-medium">{generatedIdentity.creditCardCvc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{generatedIdentity.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupation</p>
                    <p className="font-medium">{generatedIdentity.occupation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Physical & Other */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
              <CardHeader>
                <CardTitle>Physical Characteristics & Other</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="font-medium">{generatedIdentity.height}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium">{generatedIdentity.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <p className="font-medium">{generatedIdentity.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Favorite Color</p>
                    <p className="font-medium">{generatedIdentity.favoriteColor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{generatedIdentity.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking #</p>
                    <p className="font-medium font-mono text-sm">{generatedIdentity.trackingNumber}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">GUID</p>
                    <p className="font-medium font-mono text-sm break-all">{generatedIdentity.guid}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}