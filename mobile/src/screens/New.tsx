import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays =
[
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

export function New()
{
    const [title, setTitle] = useState("");
    const [weekDays, setWeekDays] = useState<number[]>([]);

    function handleToggleWeekDays(weekDayIndex: number)
    {
        if(weekDays.includes(weekDayIndex))
        {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        }
        else
        {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    async function handleCreateNewHabit()
    {
        try 
        {
            if(!title.trim() || !weekDays.length)
            {
                return Alert.alert("Novo Hábito", "Informe o nome do hábito e escolha a periodicidade.");
            }

            await api.post("/habits", { title, weekDays });

            setTitle('');
            setWeekDays([]);

            Alert.alert("Novo Hábito", "Habito criado com sucesso!");
        } 
        catch (error) 
        {
            console.error(error)
            Alert.alert("Vish...", "Não foi possível criar o novo hábito. Entre em contato com o administrador da plataforma.")
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-violet-900"
                    placeholder="Exercícios, dormir bem, etc..."
                    onChangeText={setTitle}
                    value={title}
                    placeholderTextColor={colors.zinc[400]}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>
                {
                    availableWeekDays.map((weekDay, idx) =>
                    (
                        <Checkbox
                            key={idx}
                            title={weekDay}
                            checked={weekDays.includes(idx)}
                            onPress={() => handleToggleWeekDays(idx)}
                        />
                    ))
                }

                <TouchableOpacity 
                    className="w-full h-14 flex-row items-center justify-center bg-green-500 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}