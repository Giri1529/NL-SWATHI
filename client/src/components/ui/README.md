# UI Components

This folder contains reusable UI components built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## Project Showcase (`project-showcase.tsx`)

An interactive project list component with hover-triggered floating image previews.

### Features:
- Mouse-following image preview with smooth lerp interpolation (0.15 factor)
- Animated underline on project titles
- Sliding arrow icon on hover
- Year badges for each project
- Dark theme styling
- Fully responsive design

### Usage:
```tsx
import { ProjectShowcase } from "@/components/ui/project-showcase";

export default function MyPage() {
  return (
    <ProjectShowcase />
  );
}
```

### Customization:
The component uses internal project data by default. To use custom data, refactor the component to accept a `projects` prop.

## Invited Talks (`invited-talks.tsx`)

A responsive card-based grid for displaying talks and presentations.

### Features:
- 3-column responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Image cards with gradient overlay
- Attendee count badges (optional)
- Mic icon in teal accent color
- Location and audience information
- External link support (optional)
- Hover animations and effects

### Props:
- `talks?`: Talk[] - Array of talk objects (defaults to internal data)
- `title?`: string - Section heading (default: "Invited Talks")
- `subtitle?`: string - Section description (default: "Sharing knowledge at conferences and events worldwide")

### Talk Object Structure:
```typescript
interface Talk {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  audience: string;
  description: string;
  image: string;
  attendees?: number;
  link?: string;
  linkText?: string;
}
```

### Usage:
```tsx
import { InvitedTalks } from "@/components/ui/invited-talks";

const myTalks = [
  {
    id: "1",
    title: "Your Talk Title",
    subtitle: "Event Name",
    location: "Your Institution",
    audience: "TARGET AUDIENCE",
    description: "Talk description here.",
    image: "/images/your-image.jpg",
    attendees: 150,
    link: "https://your-link.com",
    linkText: "Watch Recording"
  }
];

export default function MyPage() {
  return (
    <InvitedTalks talks={myTalks} />
  );
}
```

### Styling:
- Uses teal-500/teal-600 for accent colors
- Built with Tailwind CSS classes
- Responsive design with mobile-first approach
- Dark/Light mode compatible through shadcn/ui theme system