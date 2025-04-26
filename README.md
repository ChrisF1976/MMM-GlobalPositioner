# MMM-GlobalPositioner
MagicMirror² module to globally reposition other modules on screen via fixed coordinates.

![Demo](./img/New_Position.png)

## Features

- 💯 **Absolute positioning** with exact pixel coordinates
- 🎯 Supports all four edges: `top`, `left`, `right`, `bottom`
- 🧩 Individual containers for each module
- 🚫 No conflicts with original module positioning
- 🔍 Built-in debug mode with visual guides
- ♻️ Automatic cleanup when disabled

## Installation

1. Clone into your `MagicMirror/modules` directory:
```bash
git clone https://github.com/ChrisF1976/MMM-GlobalPositioner.git
npm install
```

2. Add configuration to your `config.js`:

```javascript
{
  module: "MMM-GlobalPositioner",
  config: {
    modules: [
      {
        name: "clock", // Must match module name exactly
        position: { 
                  top: 100,    // Position from top
                  right: 50    // Position from right
                   }
      //add as much modules as you like
      }
    ]
  }
},
```

## How It Works

- Creates individual fixed-position containers
- Moves modules into their dedicated containers
- Applies precise positioning via CSS
- Maintains original module functionality

## Troubleshooting

*Q: My module isn't moving*

- Verify the module name matches exactly
- Check browser console for errors
- Increase delay or maxAttempts

*Q: Elements overlap incorrectly*

- Adjust zIndex in your module config
- Use different coordinate pairs (top+left instead of bottom+right)
  
## License

MIT © [ChrisF1976]
