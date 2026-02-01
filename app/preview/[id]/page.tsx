import { getGeneratedKit } from "@/actions/generated.actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type Params = {
  id: string;
};

const PreviewKit = async ({ params }: { params: Params }) => {
  const { id } = await params; // No need for await here, params is synchronous
  const result = await getGeneratedKit(id);



  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Generated Kit Preview</h1>

      {/* Brand Identity */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Identity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{result.kit?.brandIdentity}</p>
        </CardContent>
      </Card>

      {/* Business Description */}
      <Card>
        <CardHeader>
          <CardTitle>Business Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{result.kit!.businessDescription}</p>
        </CardContent>
      </Card>

      {/* Logo Ideas */}
      <Card>
        <CardHeader>
          <CardTitle>Logo Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.kit!.logoIdeas.logos.map((item, index) => (
              <div key={index} className="border p-4 rounded-md">
                <h3 className="font-semibold">{item.logo.title}</h3>
                <div className="flex space-x-2 mt-2">
                  {item.logo.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Status: {logoIdeas.status} - {logoIdeas.message}
          </p>
        </CardContent>
      </Card>

      {/* Social Media Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {posts.posts.map((item, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <h3 className="font-semibold">{item.post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Date: {item.post.date} | Platform: {item.post.platform}
                  </p>
                  <p className="mt-2">{item.post.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <p className="mt-4 text-sm text-muted-foreground">
            Status: {posts.status} - {posts.message}
          </p>
        </CardContent>
      </Card>

      {/* Hashtags */}
      <Card>
        <CardHeader>
          <CardTitle>Hashtags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {hashtags.hashtags[0].hashtags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Status: {hashtags.status} - {hashtags.message}
          </p>
        </CardContent>
      </Card>

      {/* Ad Ideas */}
      <Card>
        <CardHeader>
          <CardTitle>Ad Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          {adIdeas.ads.length === 0 ? (
            <p className="text-red-500">{adIdeas.message}</p>
          ) : (
            <div className="space-y-4">
              {/* Render ads if any */}
            </div>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            Status: {adIdeas.status}
          </p>
        </CardContent>
      </Card>

      {/* WhatsApp Messages */}
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {whatsappMessages.messages.map((msg, index) => (
              <div key={index} className="border p-4 rounded-md">
                <h3 className="font-semibold">{msg.hook}</h3>
                <p className="mt-2">{msg.message}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Status: {whatsappMessages.status} - {whatsappMessages.message}
          </p>
        </CardContent>
      </Card>

      {/* Personas */}
      <Card>
        <CardHeader>
          <CardTitle>Personas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((persona, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <CardTitle>{persona.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Occupation: {persona.occupation} | Age: {persona.ageRange}
                  </p>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold">Goals:</h4>
                    <ul className="list-disc pl-5">
                      {persona.goals.map((goal, goalIndex) => (
                        <li key={goalIndex}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator className="my-2" />
                  <div>
                    <h4 className="font-semibold">Interests:</h4>
                    <ul className="list-disc pl-5">
                      {persona.interests.map((interest, interestIndex) => (
                        <li key={interestIndex}>{interest}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator className="my-2" />
                  <div>
                    <h4 className="font-semibold">Challenges:</h4>
                    <ul className="list-disc pl-5">
                      {persona.challenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{socialMediaStrategy}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewKit;