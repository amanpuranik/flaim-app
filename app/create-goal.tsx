import React, { useEffect, useState } from 'react'
import Wrapper from './components/Wrapper'
import { router } from 'expo-router'
import { KeyboardAvoidingView, Image, View, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import OutlinedTextInput from './components/OutlinedTextInput'
import { Button, Dialog, IconButton, Portal, SegmentedButtons, Switch, Text, TextInput, useTheme } from 'react-native-paper'
import useGoalStore from './services/store/goalStore'
import { Goal } from './constants/types'
import { generateUid } from './services/util'
import { Timestamp } from 'firebase/firestore'
import { db_CreateGoal } from './services/db/goalService'
import Spacer from './components/Spacer'

export default function page1() {
    let clr = useTheme().colors;

    const [goalName, setGoalName] = useState("");
    const [reward, setReward] = useState("");
    const [goalVisibility, setGoalVisibility] = useState("friends")
    const [onlyColabApproval, setOnlyColabApproval] = React.useState(false);

    const [goalHasError, setGoalHasError] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const [createBtnText, setCreateBtnText] = useState("Create Goal");

    const [dialogVisible, setDialogVisible] = React.useState(false);

    const showDialog = () => {
        Keyboard.dismiss();
        setDialogVisible(true);
    }

    const hideDialog = () => setDialogVisible(false);

    useEffect(() => {
        loading ? setCreateBtnText("Creating Goal...") : setCreateBtnText("Create Goal");
    }, [loading]);

    const createGoal = async () => {
        console.log("CREATE GOAL BUTTON PRESSED")
        Keyboard.dismiss();

        const date = new Date();
        date.setDate(date.getDate() + 30);
        const goalDraft: Goal = {
            uid: generateUid(),
            name: "",
            visibility: "friends",
            isApprovalOpen: true,
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
            setLoading(true);
            await db_CreateGoal(goalDraft);
            setLoading(false);
        } else { }


    }

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <Wrapper title="Create Goal" leftIcon={"close-circle"} leftIconAction={() => router.back()}>
            <ScrollView className='w-full h-full flex-1'>
                <View className='pt-5 px-5'>
                    <Text className='pl-2 pb-1 self-start' variant='titleMedium'>
                        Give your goal a name
                    </Text>
                    <OutlinedTextInput
                        left={<TextInput.Icon disabled icon="circle-edit-outline" />}
                        placeholder="Goal Name... *"
                        returnKeyType="next"
                        value={goalName}
                        onChangeText={(text) => setGoalName(text)}
                        error={goalHasError}
                        errorText='Choose a name'
                        autoCapitalize="none"
                    />
                    <Spacer space={2} />
                    <Text className='pl-2 pb-1 self-start' variant='titleMedium'>
                        Put a reward for completing the Goal!
                    </Text>
                    <OutlinedTextInput
                        left={<TextInput.Icon disabled icon="candy" />}
                        right={<TextInput.Icon icon="chat-question" onPress={() => showDialog()} />}
                        placeholder="Reward..."
                        returnKeyType="next"
                        value={reward}
                        onChangeText={(text) => setReward(text)}
                        autoCapitalize="none"
                    />
                    <Spacer space={2} />
                    <Text className='pl-2 pb-1 self-start' variant='titleMedium'>
                        Who can view the Goal?
                    </Text>
                    <SegmentedButtons
                        style={{ borderWidth: 0 }}
                        value={goalVisibility}
                        onValueChange={(value) => setGoalVisibility(value)}
                        buttons={[
                            {
                                value: 'friends',
                                label: 'Friends',
                                icon: 'account-group'
                            },
                            {
                                value: 'collaborators',
                                label: 'Collaborators',
                                icon: 'lock',
                                onPress: () => setOnlyColabApproval(true)
                            },
                        ]}
                    />
                    <Spacer space={2} />
                    <View className='w-full flex-row items-center'>
                        <Text style={{ color: goalVisibility === "collaborators" ? clr.surfaceDisabled : clr.onBackground }} variant='titleMedium' className='mr-auto'>Only collaborator can approve</Text>
                        <Switch disabled={goalVisibility === "collaborators"} value={onlyColabApproval} onValueChange={() => setOnlyColabApproval(!onlyColabApproval)} />
                    </View>
                </View>
            </ScrollView>
            <Button
                loading={loading}
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
