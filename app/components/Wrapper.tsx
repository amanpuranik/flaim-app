import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import { signOut } from "../helpers/auth";

type HeaderProps = {
  title?: String;
  leftIcon?: "back" | "close" | "friends";
  rightIcon?: "profile" | "stats";
  closeFunction?: () => void;
  openStats?: () => void;
  children: any;
};

function getIcon(iconName: String): IconSource {
  switch (iconName) {
    case "close":
      return "close";
    case "back":
      return "arrow-left";
    case "profile":
      return "account";
    case "friends":
      return "account-group";
    case "stats":
      return "crown";
    default:
      return "";
  }
}

export default function Wrapper(props: HeaderProps) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        signOut();
        router.replace("/login");
      }
    });
  }, []);

  let clr = useTheme().colors;

  const leftIcon = props.leftIcon;
  const rightIcon = props.rightIcon;

  const iconWidth = "w-1/5";

  return (
    <SafeAreaView
      style={{ backgroundColor: clr.background }}
      className={`flex-1 px-5 pt-4`}
    >
      <View className="flex-row items-center justify-between">
        {leftIcon == "back" && (
          <TouchableOpacity onPress={() => router.back()} className={iconWidth}>
            <IconButton
              icon={getIcon(leftIcon)}
              iconColor={clr.primary}
              size={32}
            />
          </TouchableOpacity>
        )}
        {leftIcon == "close" && (
          <TouchableOpacity
            onPress={() => props.closeFunction}
            className={iconWidth}
          >
            <IconButton
              icon={getIcon(leftIcon)}
              iconColor={clr.primary}
              size={32}
            />
          </TouchableOpacity>
        )}
        {leftIcon == "friends" && (
          <TouchableOpacity
            onPress={() => router.push("/friends")}
            className={iconWidth}
          >
            <IconButton
              icon={getIcon(leftIcon)}
              iconColor={clr.primary}
              size={32}
            />
          </TouchableOpacity>
        )}
        {!leftIcon && <View className={iconWidth}></View>}
        {props.title && <Text variant={"headlineSmall"}>{props.title}</Text>}
        {rightIcon == "profile" && (
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className={iconWidth}
          >
            <IconButton
              icon={getIcon(rightIcon)}
              iconColor={clr.primary}
              size={32}
            />
          </TouchableOpacity>
        )}
        {rightIcon == "stats" && (
          <TouchableOpacity
            onPress={() => props.openStats}
            className={iconWidth}
          >
            <IconButton
              icon={getIcon(rightIcon)}
              iconColor={clr.primary}
              size={32}
            />
          </TouchableOpacity>
        )}
        {!rightIcon && <View className={iconWidth}></View>}
      </View>
      {props.children}
    </SafeAreaView>
  );
}
