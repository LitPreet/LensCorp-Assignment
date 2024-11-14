// "use client"

// import * as React from "react"
// import * as SwitchPrimitives from "@radix-ui/react-switch"

// import { cn } from "@/lib/utils"

// const Switch = React.forwardRef<
//   React.ElementRef<typeof SwitchPrimitives.Root>,
//   React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
// >(({ className, ...props }, ref) => (
//   <SwitchPrimitives.Root
//     className={cn(
//       "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
//       className
//     )}
//     {...props}
//     ref={ref}
//   >
//     <SwitchPrimitives.Thumb
//       className={cn(
//         "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
//       )}
//     />
//   </SwitchPrimitives.Root>
// ))
// Switch.displayName = SwitchPrimitives.Root.displayName

// export { Switch }

"use client"

import * as React from "react"

const Switch = React.forwardRef<React.ElementRef<'input'>, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, ...props }, ref) => {
    const [checked, setChecked] = React.useState(false);

    // Handle the click event to toggle the state
    const handleChange = () => {
      setChecked(!checked);
    };

    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className={`sr-only peer ${className}`}
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
      </label>
    );
  }
)

Switch.displayName = 'Switch'

export { Switch }

