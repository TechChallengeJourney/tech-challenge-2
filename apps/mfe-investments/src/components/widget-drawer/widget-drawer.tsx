import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { BytebankButton, BytebankCard, BytebankDrawer, BytebankText } from "@repo/ui";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { User, useUser, WidgetDescription, WidgetKey, WidgetName } from "@repo/data-access";
import { useState } from "react";
import { updateWidgetPreference } from "../../services/widgets";

export const BytebankWidgetDrawer = ({ openDrawer, onClose }: { openDrawer: boolean; onClose: () => void }) => {
    const { user, setUser } = useUser();
    if(!user) return;

    const selectedWidgets = user ? user.selectedWidgets : [];
    const widgetKeys =  Object.entries(WidgetKey).map(([key, value]) => ({ key, value })) as unknown as Array<{key:keyof typeof WidgetKey; value: WidgetKey}>;

    const [widgets, setWidgets] = useState(() =>
        widgetKeys.map((key) => ({
            key,
            name: WidgetName[key.key],
            description: WidgetDescription[key.key],
            value: selectedWidgets.includes(WidgetKey[key.key]),
        }))
    );

    const handleChange = (key: WidgetKey, checked: boolean) => {
        setWidgets(prev => prev.map(w => w.key.value === key ? { ...w, value: checked } : w));
    };

    const onSave = async () => {
        const selectedWidgets = widgets.filter(widget => widget.value).map(widget => widget.key.value);
        const userData: User = await updateWidgetPreference(selectedWidgets, user._id);
        if (userData) {
            setUser(userData);
            onClose();
        }
    }

    return (
        <BytebankDrawer anchor="right" open={openDrawer} onClose={onClose} title="Customizar Widgets">
            <Box minHeight="84vh" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"flex-end"}>
                <Box>
                    <Box pb={2}>
                        <BytebankText variant={"sm"} fontWeight={"bold"}>Visibilidade dos widgets</BytebankText>
                    </Box>
                    <FormGroup>
                        {widgets.map(({ key, name, description, value }) => (
                            <Box pb={1} key={key.key}>
                                <BytebankCard>
                                    <Box p={2} display={"flex"} gap={2} flexDirection={"column"} flexWrap={"nowrap"}>
                                        <Box gap={2} display={"flex"} flexDirection={"row"} alignItems={"center"} flexWrap={"nowrap"} justifyContent={"space-between"}>
                                            <Box display={"flex"} gap={2} alignItems={"center"}>
                                                <Box>
                                                    <AutoAwesomeMosaicIcon />
                                                </Box>
                                                <Box>
                                                    <BytebankText variant={"sm"} fontWeight={"bold"}>{name}</BytebankText>
                                                    <BytebankText variant={"xs"}>{description} </BytebankText>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <FormControlLabel
                                                    label={''}
                                                    control={
                                                        <Switch
                                                            checked={value}
                                                            onChange={(e) => handleChange(key.value, e.target.checked)}
                                                            name={key.value}
                                                        />
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </BytebankCard>
                            </Box>
                        ))}
                    </FormGroup>
                </Box>
                <Box pt={2}>
                    <BytebankButton label={"Aplicar mudanças"} variant={"contained"} color={"primary"} onClick={onSave} />
                </Box>
            </Box>
        </BytebankDrawer>
    );
};
