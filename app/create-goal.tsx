import React, { useEffect, useState } from 'react'
import Wrapper from './components/Wrapper'
import { router, useNavigation } from 'expo-router'
import { View, ScrollView, Keyboard, Image, TouchableOpacity, ListRenderItem } from 'react-native'
import { ActivityIndicator, Button, Chip, Dialog, Divider, Portal, SegmentedButtons, Switch, Text, TextInput, TouchableRipple, useTheme } from 'react-native-paper'
import { FlaimUser, Goal } from './constants/types'
import { generateUid } from './services/util'
import { Timestamp } from 'firebase/firestore'
import { db_CreateGoal } from './services/db/goalService'
import Spacer from './components/Spacer'
import useUserStore from './services/store/userStore'
import { db_GetUsers } from './services/db/userService'
import FlatTextInput from './components/FlatTextInput'
import DatePicker from 'react-native-neat-date-picker'
import { CommonActions } from "@react-navigation/native";
import { FlatList } from 'react-native-gesture-handler'



export default function CreateGoal() {
    let clr = useTheme().colors;
    const navigation = useNavigation();
    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate() + 1);


    const [friendsLoading, setFriendsLoading] = useState(true);

    const { currentUser } = useUserStore();

    const [goalNameInput, setGoalNameInput] = useState("");
    const [rewardInput, setRewardInput] = useState("");

    const [collaboratorInput, setCollaboratorInput] = useState("");
    const [collaboratorInputIsFocused, setCollaboratorInputIsFocused] = useState(false);
    const [collaboratorInputMatches, setCollaboratorInputMatches] = useState<FlaimUser[]>([]);


    const [collaboratorRoleInput, setCollaboratorRoleInput] = useState<'partner' | 'student' | 'teacher'>("partner");
    const [collaboratorUid, setCollaboratorUid] = useState<string | null>(null);

    const [onlyColabCanView, setOnlyColabCanView] = useState(false);
    const [onlyColabCanApprove, setOnlyColabCanApprove] = useState(false);

    const [goalEndDateInput, setGoalEndDateInput] = useState<Date | null>(null);

    const [showDatePicker, setShowDatePicker] = useState(false);


    const [friends, setFriends] = useState<FlaimUser[]>([]);

    const [creatingGoal, setCreatingGoal] = useState(false);
    const [createBtnText, setCreateBtnText] = useState("Create Goal");

    //Error States for inputs
    const [goalInputHasError, setGoalInputHasError] = useState<boolean>(false);
    const [collaboratorInputHasError, setCollaboratorInputHasError] = useState<boolean>(false);
    const [goalEndDateInputHasError, setGoalEndDateInputHasError] = useState<boolean>(false);



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
        if (collaboratorInput.length > 0) {
            if (friends) {
                const matches: FlaimUser[] = friends.filter((friend: FlaimUser) => friend.username.includes(collaboratorInput));
                setCollaboratorInputMatches(matches);
            }
        } else {
            setCollaboratorInputMatches([]);
        }

    }, [collaboratorInput])


    useEffect(() => {
        if (currentUser) {
            db_GetUsers(currentUser.friendUids).then((friends) => {
                setFriends(friends)
                setFriendsLoading(false);
            })
        }
    }, [])

    const createGoal = () => {
        console.log("CREATE GOAL BUTTON PRESSED")
        Keyboard.dismiss();



        if (goalNameInput.length < 1 || collaboratorUid === null || goalEndDateInput === null) {
            setGoalInputHasError(goalNameInput.length < 1);
            setCollaboratorInputHasError(collaboratorUid === null)
            setGoalEndDateInputHasError(goalEndDateInput === null);
        } else {
            setCreatingGoal(true);
            const goalDraft: Goal = {
                uid: generateUid(),
                name: goalNameInput,
                onlyColabsCanView: onlyColabCanView,
                onlyColabsCanApprove: onlyColabCanApprove,
                reward: rewardInput,
                goalEndDate: Timestamp.fromDate(goalEndDateInput!),
                updatedAt: Timestamp.now(),
                createdAt: Timestamp.now(),
                collaboratorUids: [collaboratorUid!],
                collaborators: [{
                    role: collaboratorRoleInput,
                    uid: generateUid(),
                    userUid: currentUser?.uid!
                }]
            }
            db_CreateGoal(goalDraft)
                .then(() => {
                    setCreatingGoal(false);
                    navigation.dispatch(CommonActions.reset({
                        routes: [{ key: "feed", name: "feed" }]
                    }))
                })
                .catch((e: any) => {
                    setCreatingGoal(false);
                    console.log(e)
                });
        }
    }

    // const renderFriendsSearchList = (friend: any) => {
    //     return <View className='w-full h-full'>
    //         <TouchableRipple
    //             onPress={() => {
    //                 setCollaboratorUid(friend.uid)
    //                 setCollaboratorInput(friend.username)
    //             }}
    //             key={generateUid()}
    //         >
    //             <View>
    //                 {/* {index != 0 && <Divider />} */}
    //                 <View className={`flex-row items-center`}>
    //                     <Image
    //                         className={`m-1 h-10 w-10 rounded-full mr-4`}
    //                         source={require("../assets/images/profilepic.jpeg")} // Replace with actual image URI
    //                     />
    //                     <Text style={{ color: clr.onSecondary }}>{friend.username}</Text>
    //                 </View>
    //             </View>
    //         </TouchableRipple>

    //     </View>

    // }

    return (
        <Wrapper
            title="Create Goal"
            leftIcon={"close-circle-outline"}
            leftIconAction={() => router.back()}
            rightIcon={"plus-circle"}
            rightIconAction={() => createGoal()}
        >
            <View className='w-full h-full flex-1'>
                <View className='pt-5'>
                    <FlatTextInput
                        onBlur={() => {
                            if (goalNameInput.length > 0) {
                                setGoalInputHasError(false);
                            }
                        }}
                        left={<TextInput.Icon disabled icon="circle-edit-outline" />}
                        placeholder="Goal Name... *"
                        value={goalNameInput}
                        onChangeText={(text) => setGoalNameInput(text)}
                        error={goalInputHasError}
                        errorText='Choose a name'
                        autoCapitalize="none"
                    />
                    <Spacer space={2} />
                    <FlatTextInput
                        onFocus={() => setCollaboratorInputIsFocused(true)}
                        onBlur={() => {
                            if (collaboratorUid != null) {
                                setCollaboratorInputHasError(false);
                            }
                            setCollaboratorInputIsFocused(false)
                        }}
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
                        error={collaboratorInputHasError}
                        errorText='Choose a collaborator'
                    />

                    {collaboratorInputIsFocused && collaboratorInputMatches.length > 0 &&
                        <ScrollView
                            keyboardShouldPersistTaps={"always"}
                            style={{ backgroundColor: clr.surfaceVariant }}
                            className='self-center absolute z-20 top-[146] h-auto max-h-32 w-11/12 rounded-md'>
                            {friendsLoading && <ActivityIndicator color={clr.secondaryContainer} className='py-2' />}
                            {!friendsLoading &&
                                <View>
                                    {collaboratorInputMatches.map((friend, index) => (
                                        <TouchableRipple
                                            onPress={() => {
                                                setCollaboratorUid(friend.uid)
                                                setCollaboratorInput(friend.username)
                                            }}
                                            key={index}
                                        >
                                            <View>
                                                {index != 0 && <Divider />}
                                                <View className={`flex-row items-center`}>
                                                    <Image
                                                        className={`m-1 h-10 w-10 rounded-full mr-4`}
                                                        source={require("../assets/images/profilepic.jpeg")} // Replace with actual image URI
                                                    />
                                                    <Text style={{ color: clr.onSurfaceVariant }}>{friend.username}</Text>
                                                </View>
                                            </View>
                                        </TouchableRipple>
                                    ))}
                                </View>
                            }

                        </ScrollView>

                    }
                    <SegmentedButtons
                        theme={{ roundness: 0 }}
                        value={collaboratorRoleInput}
                        onValueChange={(value) => setCollaboratorRoleInput(value as 'partner' | 'student' | 'teacher')}
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
                        value={rewardInput}
                        onChangeText={(text) => setRewardInput(text)}
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
                    <View className='w-full px-5 flex-row items-center'>
                        <Text variant='titleSmall' className='mr-auto'>Complete Date</Text>
                        {goalEndDateInput &&
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="items-center"
                            >
                                <Text variant='titleMedium' style={{ color: clr.primary }} className="font-bold">
                                    {goalEndDateInput.toDateString()}
                                </Text>
                            </TouchableOpacity>
                        }
                        {!goalEndDateInput &&
                            <Button theme={{ roundness: 8 }} mode='elevated' onPress={() => setShowDatePicker(true)}>Set Completion Date</Button>
                        }

                    </View>
                    {goalEndDateInputHasError &&
                        <View className='w-full px-5 mt-2 items-center'>
                            <Text style={{ color: clr.error }}>Select a completion date for your goal</Text>
                        </View>
                    }
                    <Spacer space={5} />
                </View>
            </View>

            <DatePicker
                colorOptions={{
                    backgroundColor: clr.background,
                    headerColor: clr.primary,
                    headerTextColor: clr.onPrimary,
                    confirmButtonColor: clr.primary,
                    dateTextColor: clr.onBackground,
                    selectedDateBackgroundColor: clr.primary,
                    weekDaysColor: clr.primary,
                    selectedDateTextColor: clr.onPrimary,
                    changeYearModalColor: clr.primary
                }}
                isVisible={showDatePicker}
                mode={'single'}
                minDate={new Date()}
                onCancel={() => {
                    setShowDatePicker(false);
                }}
                onConfirm={(date: any) => {
                    const dateOutput: Date = date.date;
                    setShowDatePicker(false);
                    if (dateOutput.toDateString() !== todayDate.toDateString()) {
                        setGoalEndDateInput(date.date);
                    }
                }}

            />
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
