import { PolaroidGallery } from "@/components/PolaroidGallery";

export const metadata = {
  title: "Polaroid Archives | HUE Unlimited",
  description: "A curated collection of polaroid captures — each one with a story to tell.",
};

const polaroids = [
  {
    id: "1",
    image: "/lovable-uploads/7da3a105-3a86-4eee-bdfd-d250d327e586.png",
    title: "TZIA",
    backstory: "Caught her in that magic hour when the light hits different. She was feeling herself and honestly? We were all here for it. Pure vibes.",
  },
  {
    id: "2",
    image: "/lovable-uploads/6247178b-fac5-41c5-9836-150cceb0c28d.png",
    title: "Portrait Study",
    backstory: "Sunday morning sessions hit different when you're chasing that natural glow. No filters needed when you got that raw talent shining through.",
  },
  {
    id: "3",
    image: "/lovable-uploads/72237c52-eeda-42bc-aea6-883d03d11afe.png",
    title: "umi kyou",
    backstory: "My guy was channeling pure zen energy that day. Sometimes you catch someone in their element and everything just clicks - minimal effort, maximum impact.",
  },
  {
    id: "4",
    image: "/lovable-uploads/0701a505-933e-4f63-9f74-0b28cc541f82.png",
    title: "Reflection",
    backstory: "Found this vintage mirror at some hole-in-the-wall spot downtown. The history in that glass tells stories I could never write - just had to capture the moment.",
  },
  {
    id: "5",
    image: "/lovable-uploads/ccc871c0-b84f-463b-bac5-a4d09946e098.png",
    title: "violet 21/1/24",
    backstory: "January was hitting heavy that day, sky all moody and purple. Sometimes the weather sets the whole vibe and you just gotta roll with it.",
  },
  {
    id: "6",
    image: "/lovable-uploads/b1fff94f-28a0-4868-9ece-d2ea11475f64.png",
    title: "Mirror Self",
    backstory: "Me vs. me in the reflection game. Wild how mirrors show you things about yourself you never noticed - art imitating life imitating art.",
  },
  {
    id: "7",
    image: "/lovable-uploads/7b67242c-637e-467b-8681-c40382684850.png",
    title: "WAYSURG 1991",
    backstory: "Throwing it back to when hip-hop was raw and the streets had something to say. This one's for the culture - 90s energy with that gritty realness.",
  },
  {
    id: "8",
    image: "/lovable-uploads/c84b6027-c947-4758-874b-7ed482f9fafa.png",
    title: "Gesture",
    backstory: "Sometimes a single move says everything you can't put into words. The way hands tell stories - that's poetry in motion right there.",
  },
  {
    id: "9",
    image: "/lovable-uploads/1280b402-b004-4be4-b3d6-4e8ca2cd9b7b.png",
    title: "Thoughtful",
    backstory: "Caught him in his bag, thinking deep thoughts. That warm glow just wrapped around him like the universe was co-signing his whole vibe.",
  },
  {
    id: "10",
    image: "/lovable-uploads/a82e1c31-ae61-4767-b4c8-7976764a2e4a.png",
    title: "Classic Portrait",
    backstory: "She walks in the room and you know she's got that energy. Confidence isn't loud - it's quiet power that speaks volumes through the lens.",
  },
  {
    id: "12",
    image: "/lovable-uploads/cec6d9e0-328a-483e-9b37-167bf4b1793c.png",
    title: "Cool Reflections",
    backstory: "Black and white because some moments don't need color to tell their story. My man's just existing in his element - effortless cool.",
  },
  {
    id: "13",
    image: "/lovable-uploads/0918c866-be94-4faa-a080-ef6c196405b4.png",
    title: "Behind the Scenes",
    backstory: "The magic happens when the cameras are rolling but nobody's watching. Double exposure caught that creative chaos - art in its rawest form.",
  },
  {
    id: "14",
    image: "/lovable-uploads/f5c76cd5-1161-4b61-a524-39dbf44adf15.png",
    title: "Golden Hour",
    backstory: "That golden hour light hit and my guy was just vibing in his favorite hoodie. Sometimes the realest moments happen when you're not even trying.",
  },
  {
    id: "15",
    image: "/lovable-uploads/6ff731c7-48da-4900-8564-c056d0cb44f9.png",
    title: "Profile",
    backstory: "Profile shots always reveal something deeper. The way light carves out her features - that's timeless beauty with modern soul.",
  },
  {
    id: "16",
    image: "/lovable-uploads/9ef5a1ae-e473-42e4-8b73-676a306b3468.png",
    title: "To Hue",
    backstory: "Rose petals and intimate vibes - this one was all about celebrating love in its purest form. The circle frame keeps it sacred, keeps it real.",
  },
  {
    id: "17",
    image: "/lovable-uploads/cbd9c136-59fe-456b-b0c6-e589bd415858.png",
    title: "GUNNA x EPW",
    backstory: "Studio session with the crew where the magic happens. Under those lights, creativity flows different - this is where hits are born.",
  },
  {
    id: "18",
    image: "/lovable-uploads/c43faa7a-4245-4887-8f5b-2fda31dda1ad.png",
    title: "Brothers in Focus",
    backstory: "Real ones recognize real. These two been holding it down together, and that band tee? Yeah, they got taste. Brotherhood captured in one frame.",
  },
  {
    id: "19",
    image: "/lovable-uploads/554a032b-70fd-42ea-a208-e949a43ab2f6.png",
    title: "The Collective",
    backstory: "When the whole squad pulls up with different energies but one vision. This crew represents that new wave - diverse, talented, and unapologetically themselves.",
  },
  {
    id: "20",
    image: "/lovable-uploads/dd8eb39f-9082-43e8-81ab-4b9cc5fa583b.png",
    title: "ST80 & KARTIGAN",
    backstory: "Professional collab energy when the vision aligns perfectly. Studio lights, creative minds, and that moment when you know you're capturing something special.",
  },
  {
    id: "21",
    image: "/lovable-uploads/81a83ea4-df5e-4685-b658-55c2ef7100a9.png",
    title: "Squad Goals",
    backstory: "The crew that stays together, creates together. Everyone brought their own flavor to this shot - genuine friendship you can't fake.",
  },
  {
    id: "22",
    image: "/lovable-uploads/5c40904e-84fa-4eba-8cd1-ef090ce7460d.png",
    title: "Blue Frame Portrait",
    backstory: "That blue frame was speaking to me - art within art, layers on layers. Sometimes you gotta frame the moment to make it immortal.",
  },
];

export default function PolaroidArchives() {
  return (
    <div className="min-h-screen pt-24">
      <PolaroidGallery polaroids={polaroids} />
    </div>
  );
}
