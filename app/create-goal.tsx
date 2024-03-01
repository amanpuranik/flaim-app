import React, { useEffect, useState } from 'react'
import Wrapper from './components/Wrapper'
import { router } from 'expo-router'
import { View, ScrollView, Keyboard, Image, TouchableOpacity } from 'react-native'
import { ActivityIndicator, Button, Chip, Dialog, Divider, Portal, SegmentedButtons, Switch, Text, TextInput, TouchableRipple, useTheme } from 'react-native-paper'
import { FlaimUser, Goal } from './constants/types'
import { generateUid } from './services/util'
import { Timestamp } from 'firebase/firestore'
import { db_CreateGoal } from './services/db/goalService'
import Spacer from './components/Spacer'
import useUserStore from './services/store/userStore'
import { db_GetUsers } from './services/db/userService'
import FlatTextInput from './components/FlatTextInput'

export default function CreateGoal() {
    let clr = useTheme().colors;

    const [friendsLoading, setFriendsLoading] = useState(true);

    const { currentUser } = useUserStore();

    const [goalName, setGoalName] = useState("");
    const [reward, setReward] = useState("");
    const [collaboratorInput, setCollaboratorInput] = useState("")
    const [collaboratorInputIsFocused, setCollaboratorInputIsFocused] = useState(false)
    const [collaboratorInputMatchesFriend, setCollaboratorInputMathcesFriend] = useState(true);
    const [collaboratorRole, setCollaboratorRole] = useState("partner")
    const [collaboratorUid, setCollaboratorUid] = useState<string | null>(null);

    const [onlyColabCanView, setOnlyColabCanView] = useState(false)
    const [onlyColabCanApprove, setOnlyColabCanApprove] = useState(false)

    const [friends, setFriends] = useState<FlaimUser[]>([]);

    const [goalHasError, setGoalHasError] = useState<boolean>(false)
    const [creatingGoal, setCreatingGoal] = useState(false);
    const [createBtnText, setCreateBtnText] = useState("Create Goal");

    const [dialogVisible, setDialogVisible] = React.useState(false);

    const showDialog = () => {
        Keyboard.dismiss();
        setDialogVisible(true);
    }

    const hideDialog = () => setDialogVisible(false);

    useEffect(() => {
        creatingGoal ? setCreateBtnText("Creating Goal...") : setCreateBtnText("Create Goal");
    }, [creatingGoal]);

    useEffect(() => {
        if (currentUser) {
            db_GetUsers(currentUser.friendUids).then((friends) => setFriends(friends))
        }
        setFriendsLoading(false);
    }, [])

    const createGoal = async () => {
        console.log("CREATE GOAL BUTTON PRESSED")
        Keyboard.dismiss();

        const date = new Date();
        date.setDate(date.getDate() + 30);
        const goalDraft: Goal = {
            uid: generateUid(),
            name: "",
            onlyColabsCanView: false,
            onlyColabsCanApprove: false,
            reward: "",
            goalEndDate: date,
            updatedAt: Timestamp.now(),
            createdAt: Timestamp.now(),
            collaboratorUids: [],
            collaborators: [],
            comments: [],
            approvals: [],
            posts: []
        }
        if (true) {
            setCreatingGoal(true);
            await db_CreateGoal(goalDraft);
            setCreatingGoal(false);
        } else { }


    }

    return (
        <Wrapper title="Create Goal" leftIcon={"close-circle"} leftIconAction={() => router.back()}>
            <ScrollView className='w-full h-full flex-1'>
                <View className='pt-5'>
                    <FlatTextInput
                        left={<TextInput.Icon disabled icon="circle-edit-outline" />}
                        placeholder="Goal Name... *"
                        value={goalName}
                        onChangeText={(text) => setGoalName(text)}
                        error={goalHasError}
                        errorText='Choose a name'
                        autoCapitalize="none"
                    />
                    <Spacer space={2} />
                    <FlatTextInput
                        onFocus={() => setCollaboratorInputIsFocused(true)}
                        onBlur={() => setCollaboratorInputIsFocused(false)}
                        left={<TextInput.Icon disabled icon="account" />}
                        right={collaboratorUid &&
                            <TextInput.Icon
                                color={clr.onBackground}
                                onPress={() => {
                                    setCollaboratorUid(null)
                                    setCollaboratorInput("");
                                }}
                                icon="close"
                            />
                        }
                        placeholder="Collaborator... *"
                        disabled={collaboratorUid != null}
                        value={collaboratorInput}
                        textContentType='none'
                        onChangeText={(text) => setCollaboratorInput(text)}
                        autoCapitalize="none"
                    />
                    <Text>NEED TO FIX THE SCROLLVIEW PROBLEM, AND NEED TO MAKE USE OF collaboratorInputMatchesFriend, THEN ADD THE DATE PICKER </Text>
                    {collaboratorInputIsFocused && collaboratorInput.length > 0 && collaboratorInputMatchesFriend &&
                        <ScrollView
                            style={{ backgroundColor: clr.inverseOnSurface }}
                            className='self-center absolute z-10 top-[146] h-auto max-h-32 w-11/12 rounded-sm'
                        >
                            {friendsLoading && <ActivityIndicator />}
                            {!friendsLoading &&
                                <View>
                                    {friends.map((friend, index) => (
                                        <TouchableRipple
                                            onPress={() => {
                                                setCollaboratorUid(friend.uid)
                                                setCollaboratorInput(friend.email)
                                            }}
                                            key={friend.uid}
                                        >
                                            <View>
                                                {index != 0 && <Divider />}
                                                <View className={`flex-row items-center`}>
                                                    <Image
                                                        className={`m-1 h-10 w-10 rounded-full mr-4`}
                                                        source={require("../assets/images/profilepic.jpeg")} // Replace with actual image URI
                                                    />
                                                    <Text>{friend.email}</Text>
                                                </View>
                                            </View>
                                        </TouchableRipple>
                                    ))}
                                </View>
                            }
                        </ScrollView>}
                    <SegmentedButtons
                        theme={{ roundness: 0 }}
                        value={collaboratorRole}
                        onValueChange={(value) => setCollaboratorRole(value)}
                        density='small'
                        buttons={[
                            {
                                style: { borderWidth: 0, borderBottomColor: "white" },
                                value: 'partner',
                                label: 'Partner',
                                icon: 'handshake'
                            },
                            {
                                style: { borderWidth: 0 },
                                value: 'student',
                                label: 'Student',
                                icon: 'school',
                            },
                            {
                                style: { borderWidth: 0 },
                                value: 'teacher',
                                label: 'Teacher',
                                icon: 'ruler',
                            },
                        ]}
                    />
                    <Spacer space={2} />
                    <FlatTextInput
                        left={<TextInput.Icon disabled icon="candy" />}
                        right={<TextInput.Icon icon="chat-question" onPress={() => showDialog()} />}
                        placeholder="Reward..."
                        value={reward}
                        onChangeText={(text) => setReward(text)}
                        autoCapitalize="none"
                    />
                    <Spacer space={5} />
                    <View className='w-full px-5 flex-row items-center'>
                        <Text variant='titleSmall' className='mr-auto'>Only collaborators can view</Text>
                        <Switch value={onlyColabCanView} onValueChange={() => setOnlyColabCanView(!onlyColabCanView)} />
                    </View>
                    <Spacer space={2} />
                    <View className='w-full px-5 flex-row items-center'>
                        <Text style={{ color: onlyColabCanView ? clr.surfaceDisabled : clr.onBackground }} variant='titleSmall' className='mr-auto'>Only collaborator can approve</Text>
                        <Switch disabled={onlyColabCanView} value={onlyColabCanView || onlyColabCanApprove} onValueChange={() => setOnlyColabCanApprove(!onlyColabCanApprove)} />
                    </View>
                    <Spacer space={5} />
                </View>
            </ScrollView>
            <Button
                loading={creatingGoal}
                contentStyle={{ height: 50 }}
                mode="contained"
                onPress={() => createGoal()}
                className='mb-10 w-10/12 self-center'
            >
                {createBtnText}
            </Button>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Title>
                        🍬🍬🍬
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyLarge">
                            You can describe a reward that you'll be getting after completion of this goal!
                            Keep your goal collaborators accountable!!
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Got it</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Wrapper>

    )
}
