console.clear();

doit();

function parseColor(color) {
  color = color.trim();
  const hexValue = color.substring(1);
  const expandedHex =
    hexValue.length === 3
      ? hexValue
          .split("")
          .map((char) => char + char)
          .join("")
      : hexValue;
  return {
    r: parseInt(expandedHex.slice(0, 2), 16) / 255,
    g: parseInt(expandedHex.slice(2, 4), 16) / 255,
    b: parseInt(expandedHex.slice(4, 6), 16) / 255,
  };
}

function doit() {
  const primitiveColors = {
    cyan: {
      0o0: "#D8F1FF",
      100: "#BAE6FF",
      200: "#99D9FF",
      300: "#77CCFF",
      400: "#33B1FF",
      500: "#1A92E1",
      600: "#0072C3",
      700: "#005698",
      800: "#003A6D",
      900: "#07243D",
    },

    success: {
      0o0: "#ECFFEB",
      100: "#ACE0B0",
      200: "#8CD092",
      300: "#6BC074",
      400: "#42A056",
      500: "#198038",
      600: "#116D36",
      700: "#095933",
      800: "#05462C",
      900: "#003325",
    },

    magenta: {
      0o0: "#FFDEED",
      100: "#FFCFE5",
      200: "#FFC0DC",
      300: "#FFAACF",
      400: "#FF7EB6",
      500: "#E85293",
      600: "#D02670",
      700: "#A21854",
      800: "#740937",
      900: "#480B26",
    },

    neutral: {
      0o0: "#F7F7F7",
      100: "#E3E4E5",
      200: "#CED0D2",
      300: "#A6AAAE",
      400: "#898D91",
      500: "#6B6F73",
      600: "#5A5D60",
      700: "#494A4D",
      800: "#232324",
      900: "#090909",
    },

    orange: {
      0o0: "#FFE7D7",
      100: "#FFD9BE",
      200: "#FFC49A",
      300: "#FFAE75",
      400: "#FF832B",
      500: "#DD6916",
      600: "#BA4E00",
      700: "#8C3C00",
      800: "#5E2900",
      900: "#391800",
    },

    primary: {
      0o0: "#F3E5F5",
      100: "#E5C6EA",
      200: "#D7A7DF",
      300: "#BA68C8",
      400: "#9946B9",
      500: "#7724AA",
      600: "#611C9B",
      700: "#4A148C",
      800: "#350A60",
      900: "#200033",
    },

    failure: {
      0o0: "#FFEBEE",
      100: "#FBCFD4",
      200: "#F6B2BA",
      300: "#EC7985",
      400: "#E34853",
      500: "#D91620",
      600: "#B00F16",
      700: "#86070B",
      800: "#5D0406",
      900: "#330001",
    },

    teal: {
      0o0: "#D9F9F9",
      100: "#BCF5F5",
      200: "#9EF0F0",
      300: "#53D7D5",
      400: "#08BDBA",
      500: "#049D9A",
      600: "#007D79",
      700: "#005F5F",
      800: "#004144",
      900: "#0D2B2C",
    },

    warning: {
      0o0: "#FFEFE0",
      100: "#FADBB2",
      200: "#F5C783",
      300: "#EA9F26",
      400: "#CC7B1D",
      500: "#AD5713",
      600: "#8F4A0A",
      700: "#703C00",
      800: "#522B00",
      900: "#331900",
    },

    common: {
      white: "#FFFFFF",
      black: "#090909",
    },
  };

  const primitivesCollection = figma.variables.createVariableCollection("Primitives");
  const primitivesCollectionModeId = primitivesCollection.modes[0].modeId;

  let colors = primitiveColors;

  Object.keys(primitiveColors).forEach((color) => {
    Object.keys(primitiveColors[color]).forEach((scale) => {
      const token = figma.variables.createVariable(`${color}/${scale}`, primitivesCollection.id, "COLOR");
      token.setValueForMode(primitivesCollectionModeId, parseColor(colors[color][scale]));
      colors[color][scale] = token.id;
    });
  });

  const tokensCollection = figma.variables.createVariableCollection("Tokens");
  const lightModeId = tokensCollection.modes[0].modeId;
  tokensCollection.addMode("Dark");
  const darkModeId = tokensCollection.modes[1].modeId;
  tokensCollection.renameMode(lightModeId, "Light");

  function createToken(name, lightColor, darkColor) {
    const token = figma.variables.createVariable(name, tokensCollection.id, "COLOR");
    token.setValueForMode(lightModeId, {
      type: "VARIABLE_ALIAS",
      id: lightColor,
    });
    token.setValueForMode(darkModeId, {
      type: "VARIABLE_ALIAS",
      id: darkColor,
    });
  }

  function dataVariant(color) {
    createToken(`${color}/main`, colors[color][600], colors[color][400]);
  }
  function variant(color) {
    if (color === "neutral") {
      // main
      createToken("neutral/main", colors.neutral[900], colors.common.white);
      // outlined
      createToken(`neutral/outlinedActiveBg`, colors.neutral[200], colors.neutral[500]);
      createToken(`neutral/outlinedBorder`, colors.neutral[200], colors.neutral[600]);
      createToken(`neutral/outlinedColor`, colors.neutral[900], colors.common.white);
      createToken(`neutral/outlinedDisabledBorder`, colors.neutral[100], colors.neutral[800]);
      createToken(`neutral/outlinedDisabledColor`, colors.neutral[300], colors.neutral[600]);
      createToken(`neutral/outlinedHoverBg`, colors.neutral[0], colors.neutral[800]);
      createToken(`neutral/outlinedHoverBorder`, colors.neutral[900], colors.neutral[500]);
      // plain
      createToken(`neutral/plainActiveBg`, colors.neutral[200], colors.neutral[700]);
      createToken(`neutral/plainColor`, colors.neutral[900], colors.common.white);
      createToken(`neutral/plainDisabledColor`, colors.neutral[200], colors.neutral[800]);
      createToken(`neutral/plainHoverBg`, colors.neutral[100], colors.neutral[800]);
      // soft
      createToken(`neutral/softActiveBg`, colors.neutral[300], colors.neutral[600]);
      createToken(`neutral/softBg`, colors.neutral[0], colors.neutral[800]);
      createToken(`neutral/softColor`, colors.neutral[900], colors.common.white);
      createToken(`neutral/softDisabledBg`, colors.neutral[100], colors.neutral[600]);
      createToken(`neutral/softDisabledColor`, colors.neutral[300], colors.neutral[800]);
      createToken(`neutral/softHoverBg`, colors.neutral[200], colors.neutral[700]);
      // solid
      createToken(`neutral/solidActiveBg`, colors.neutral[600], colors.neutral[100]);
      createToken(`neutral/solidBg`, colors.neutral[900], colors.common.white);
      createToken(`neutral/solidColor`, colors.common.white, colors.neutral[900]);
      createToken(`neutral/solidDisabledBg`, colors.neutral[100], colors.neutral[600]);
      createToken(`neutral/solidDisabledColor`, colors.neutral[300], colors.neutral[800]);
      createToken(`neutral/solidHoverBg`, colors.neutral[800], colors.neutral[0]);
    } else {
      // main
      createToken(`${color}/main`, colors[color][500], colors[color][400]);
      // outlined
      createToken(`${color}/outlinedActiveBg`, colors[color][100], colors[color][500]);
      createToken(`${color}/outlinedBorder`, colors[color][300], colors[color][600]);
      createToken(`${color}/outlinedColor`, colors[color][500], colors.common.white);
      createToken(`${color}/outlinedDisabledBorder`, colors.neutral[100], colors.neutral[800]);
      createToken(`${color}/outlinedDisabledColor`, colors.neutral[300], colors.neutral[600]);
      createToken(`${color}/outlinedHoverBg`, colors[color][0], colors[color][900]);
      createToken(`${color}/outlinedHoverBorder`, colors[color][500], colors[color][500]);
      // plain
      createToken(`${color}/plainActiveBg`, colors[color][200], colors[color][700]);
      createToken(`${color}/plainColor`, colors[color][600], colors[color][300]);
      createToken(`${color}/plainDisabledColor`, colors[color][200], colors[color][800]);
      createToken(`${color}/plainHoverBg`, colors[color][100], colors[color][800]);
      // soft
      createToken(`${color}/softActiveBg`, colors[color][300], colors[color][600]);
      createToken(`${color}/softBg`, colors[color][0], colors[color][900]);
      createToken(`${color}/softColor`, colors[color][600], colors[color][200]);
      createToken(`${color}/softDisabledBg`, colors[color][100], colors[color][600]);
      createToken(`${color}/softDisabledColor`, colors[color][300], colors[color][800]);
      createToken(`${color}/softHoverBg`, colors[color][200], colors[color][700]);
      // solid
      createToken(`${color}/solidActiveBg`, colors[color][700], colors[color][800]);
      createToken(`${color}/solidBg`, colors[color][500], colors[color][600]);
      createToken(`${color}/solidColor`, colors.common.white, colors.common.white);
      createToken(`${color}/solidDisabledBg`, colors.neutral[100], colors.neutral[600]);
      createToken(`${color}/solidDisabledColor`, colors.neutral[300], colors.neutral[800]);
      createToken(`${color}/solidHoverBg`, colors[color][600], colors[color][700]);
    }
  }
  // // background
  createToken("background/body", colors.common.white, colors.neutral[900]);
  createToken("background/level1", colors.neutral[100], colors.neutral[800]);
  createToken("background/level2", colors.neutral[200], colors.neutral[700]);
  createToken("background/level3", colors.neutral[300], colors.neutral[600]);
  createToken("background/surface", colors.common.white, colors.neutral[900]);
  createToken("background/tooltip", colors.neutral[900], colors.neutral[0]);
  // divider
  createToken("divider", colors.neutral[200], colors.neutral[700]);
  // // focusVisible
  createToken("focusVisible", colors.neutral[900], colors.common.white);
  // text
  createToken("text/disabled", colors.neutral[200], colors.neutral[800]);
  createToken("text/inverse", colors.common.white, colors.neutral[900]);
  createToken("text/placeholder", colors.neutral[300], colors.neutral[700]);
  createToken("text/primary", colors.neutral[900], colors.common.white);
  createToken("text/secondary", colors.neutral[700], colors.neutral[300]);
  createToken("text/tertiary", colors.neutral[500], colors.neutral[500]);
  // variants
  variant("warning");
  variant("neutral");
  variant("failure");
  variant("primary");
  variant("success");
  // data variants
  dataVariant("cyan");
  dataVariant("magenta");
  dataVariant("orange");
  dataVariant("teal");
}

figma.closePlugin();
