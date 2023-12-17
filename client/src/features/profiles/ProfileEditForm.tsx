import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store"
import { Form, Formik } from "formik";
import * as yup from 'yup'
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

const ProfileEditForm = ({ setEditMode }: Props) => {
    const { profileStore: { profile, updateProfile } } = useStore();

    return (
        <Formik
            initialValues={{ displayName: profile?.displayName, bio: profile?.bio || '' }}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={yup.object({ displayName: yup.string().required() })}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className="ui form">
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextArea placeholder="Add you bio" name="bio" rows={3} />
                    <Button disabled={!isValid || !dirty} loading={isSubmitting} type='submit' positive floated='right' content='Update Profile' />
                </Form>
            )}
        </Formik>
    )
}

export default observer(ProfileEditForm);