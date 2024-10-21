import { BooleanField, Datagrid, List, ReferenceField, TextField } from "react-admin";

export const ChallengeOptionList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="text"/>
                <BooleanField source="correct"/>
                <ReferenceField source="challengedId" reference="challenges"/>
                <TextField source="imageSrc"/>
                <TextField source="audioSrc"/>
            </Datagrid>
        </List>
    );
};