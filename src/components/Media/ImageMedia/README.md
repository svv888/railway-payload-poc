# ImageMedia Component - Responsive Widths

The `ImageMedia` component has been enhanced to support precise responsive image sizing with a maximum container width system. This allows you to specify exact percentage widths for different breakpoints while maintaining a consistent maximum container width.

## New Props

### `responsiveWidths`
An array of responsive width configurations for different breakpoints.

**Type:** `ResponsiveWidth[]`
```typescript
interface ResponsiveWidth {
  breakpoint: string // Breakpoint name (sm, md, lg, xl, 2xl, 3xl)
  width: string      // Percentage width (e.g., '100%', '33.33%', '50%')
}
```

### `maxContainerWidth`
The maximum container width that percentages are calculated against. Can be specified in any CSS unit (px, vw, etc.).

**Type:** `string`
**Default:** `"100vw"`

## Available Breakpoints

The component uses the following breakpoints from `cssVariables.js`:

- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1920px

## How It Works

1. When `responsiveWidths` is provided, the component calculates actual pixel widths based on the percentage and `maxContainerWidth`
2. It generates a `sizes` attribute for Next.js Image optimization
3. The browser uses this to download the appropriately sized image for each screen size

## Examples

### Basic Usage with Viewport Width
```tsx
import { ImageMedia } from '@/components/Media/ImageMedia'

// Simple responsive behavior - uses default 100vw container
<ImageMedia
  src="/example.jpg"
  alt="Example image"
  responsiveWidths={[
    { breakpoint: 'sm', width: '100%' },    // Mobile: full viewport
    { breakpoint: 'md', width: '50%' }      // Tablet+: half viewport
  ]}
/>
```

### Container-Constrained Layout
```tsx
// Fixed pixel container with responsive grid
<ImageMedia
  src="/gallery-image.jpg"
  alt="Gallery image"
  responsiveWidths={[
    { breakpoint: 'sm', width: '100%' },     // Mobile: full width
    { breakpoint: 'md', width: '50%' },      // Tablet: 2 columns
    { breakpoint: 'lg', width: '33.33%' }    // Desktop: 3 columns
  ]}
  maxContainerWidth="1200px"
/>
```

### Full Viewport Hero
```tsx
// Hero takes percentage of full viewport width
<ImageMedia
  src="/hero.jpg"
  alt="Hero image"
  responsiveWidths={[
    { breakpoint: 'sm', width: '100%' },     // Mobile: full viewport
    { breakpoint: 'lg', width: '80%' },      // Tablet: 80% of viewport
    { breakpoint: 'xl', width: '70%' }       // Desktop: 70% of viewport
  ]}
  maxContainerWidth="100vw"
/>
```

### Product Grid with Fixed Container
```tsx
// 1 column on mobile, 2 on small tablet, 3 on tablet, 4 on desktop
<ImageMedia
  src="/product.jpg"
  alt="Product image"
  responsiveWidths={[
    { breakpoint: 'sm', width: '100%' },    // 1 column: 100%
    { breakpoint: 'md', width: '50%' },     // 2 columns: 50% each
    { breakpoint: 'lg', width: '33.33%' },  // 3 columns: 33.33% each
    { breakpoint: 'xl', width: '25%' }      // 4 columns: 25% each
  ]}
  maxContainerWidth="1300px"
/>
```

## Calculation Logic

For each breakpoint, the component:

1. Takes the percentage width (e.g., `33.33%`)
2. Converts to decimal (e.g., `0.3333`)
3. Multiplies by `maxContainerWidth` (e.g., `0.3333 * 1300 = 433px`)
4. Rounds to nearest integer (e.g., `433px`)

This ensures images are optimized for the actual rendered size while maintaining responsive behavior.

## Browser Output Example

With the configuration:
```tsx
responsiveWidths={[
  { breakpoint: 'sm', width: '100%' },
  { breakpoint: 'md', width: '50%' },
  { breakpoint: 'lg', width: '33.33%' }
]}
maxContainerWidth={1200}
```

The component generates:
```
sizes="(max-width: 1024px) 400px, (max-width: 768px) 600px, (max-width: 640px) 1200px, 400px"
```

## Fallback Behavior

- If `responsiveWidths` is not provided, the component uses the default behavior
- If `size` prop is explicitly provided, it overrides `responsiveWidths`
- Invalid breakpoint names are ignored

## Performance Benefits

- **Optimized Downloads**: Browser downloads correctly sized images
- **Bandwidth Savings**: Smaller images on mobile devices  
- **Faster Loading**: Appropriate image sizes improve load times
- **Better UX**: Images display at intended sizes immediately

## Best Practices

1. **Order breakpoints logically**: Start with mobile (`sm`) and work up
2. **Use standard percentages**: `100%`, `50%`, `33.33%`, `25%` for grid layouts
3. **Set appropriate max width**: Match your design system's container limits
4. **Test across devices**: Verify images display correctly at all breakpoints
5. **Consider content**: Use wider images for hero sections, narrower for thumbnails
