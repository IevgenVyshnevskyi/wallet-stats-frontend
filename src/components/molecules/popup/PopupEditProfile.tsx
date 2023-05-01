import { ALMOST_BLACK_FOR_TEXT, DIVIDER, PRIMARY_HOVER } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from '../../atoms/button/Button.styled';
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import { PopupWrapper } from "./Popup.styled";
import React, { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { Typography } from '../../atoms/typography/Typography.styled';
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { useForm } from "react-hook-form";
import { Form } from "../../atoms/form/Form.styled";
import VisibilityOff from "../../../shared/assets/icons/visibility-off.svg";
import VisibilityOn from "../../../shared/assets/icons/visibility-on.svg";
import { nameRegex, passwordRegex } from "../../../shared/utils/regexes";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeUserPassword, changeUserProfile, resetProfileEditErrors, setSuccessStatus } from "../../../store/userSlice";
import { IUser, PasswordChangeFormData } from "../../../store/types";
import { ButtonPopup } from "../../atoms/button/ButtonPopup";
import { userDataParsed } from "../../../api/api";

const PopupEditProfile: React.FC = () => {
	const {
		setIsEditProfilePopupOpen,
		setIsDeleteAccountPopupOpen
	} = useContext(PopupContext);

	const { isProfileChanged } = useAppSelector(state => state.user);

	const [isEditProfileTabOpen, setIsEditProfileTabOpen] = useState(true);

	const {
		formState: { isValid },
	} = useForm({ mode: "all" });

	const handleCloseClick = () => {
		setIsEditProfilePopupOpen(false);
	};

	function onDeleteAccountClick() {
		setIsDeleteAccountPopupOpen(true);
	}

	useEffect(() => {
		if (isProfileChanged) {
			handleCloseClick();
		}
	}, [isProfileChanged]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleCloseClick()
			}
		}
		window.addEventListener('keydown', handleKeyPress)
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	return (
		<PopupWrapper zIndex="5" onClick={handleCloseClick}>
			<Box onClick={event => event.stopPropagation()}>
				<Box>
					<Typography as="h2" fw="500" fz="22px" mb="25px">
						Налаштування профілю
					</Typography>
					<Box display="flex" direction="column" mb="25px">
						<Box display="flex" width="100%" mb="24px">
							<ButtonPopup onClick={() => setIsEditProfileTabOpen(true)}
								style={{
									fontWeight: isEditProfileTabOpen && "700",
									borderBottom: isEditProfileTabOpen && `2px solid ${PRIMARY_HOVER}`
								}}>Дані користувача</ButtonPopup>
							<ButtonPopup onClick={() => setIsEditProfileTabOpen(false)}
								style={{
									fontWeight: !isEditProfileTabOpen && "700",
									borderBottom: !isEditProfileTabOpen && `2px solid ${PRIMARY_HOVER}`
								}}>Зміна паролю</ButtonPopup>
						</Box>

						{isEditProfileTabOpen ? (
							<EditProfileTab />
						) : (
							<ChangePasswordTab />
						)}
					</Box>
					<Box display="flex" justifyContent="flex-end">
						<ButtonLink onClick={onDeleteAccountClick}>Видалити аккаунт</ButtonLink>
					</Box>
				</Box>
				<Button secondary onClick={handleCloseClick} p="10px 20px">
					<CrossIcon />
				</Button>
			</Box>
		</PopupWrapper>
	);
}

const EditProfileTab: React.FC = () => {
	const dispatch = useAppDispatch();

	const {
		setIsEditProfilePopupOpen,
	} = useContext(PopupContext);

	const { isProfileChanged, isLoading, user } = useAppSelector(state => state.user);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit
	} = useForm({ mode: "all" });

	const handleCloseClick = () => {
		dispatch(resetProfileEditErrors());
		setIsEditProfilePopupOpen(false);
	};

	useEffect(() => {
		if (isProfileChanged) {
			dispatch(setSuccessStatus(false))
			handleCloseClick();
		}
	}, [isProfileChanged]);

	function handleSubmitChangeProfile(data: IUser) {
		dispatch(changeUserProfile(data))
	}

	return (
		<Form onSubmit={handleSubmit(handleSubmitChangeProfile)}>
			<Box mb="35px">
				<Label htmlFor="first_name" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
					mb="6px"
					textAlight="left">Ім'я</Label>
				<Input {...register('first_name', {
					required: 'Обов\'язкове поле для заповнення',
					pattern: {
						value: nameRegex,
						message: "Назва повинна бути не менше 2 літер",
					},
				})} type="text" id="first_name" width="325px"
					className={errors.first_name && 'error'}
					defaultValue={user?.first_name || userDataParsed?.first_name}
				/>
				<Box color="red" textAlight="left" border="red" fz="13px" height="14px"
					m="0px 0 20px 0">{errors?.first_name && <>{errors?.first_name?.message || 'Error!'}</>}</Box>
			</Box>
			<Box mb="35px">
				<Label htmlFor="last_name" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
					textAlight="left">Прізвище</Label>
				<Input {...register('last_name', {
					required: 'Обов\'язкове поле для заповнення',
					pattern: {
						value: nameRegex,
						message: "Назва повинна бути не менше 2 літер",
					},
				})} type="text" id="last_name" width="325px"
					className={errors.last_name && 'error'}
					defaultValue={user?.last_name || userDataParsed?.last_name}
				/>
				<Box color="red" textAlight="left" border="red" fz="13px" height="14px"
					m="0px 0 20px 0">{errors?.last_name && <>{errors?.last_name?.message || 'Error!'}</>}</Box>
			</Box>
			<Box mb="35px">
				<Label htmlFor="email" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
					textAlight="left">Пошта</Label>
				<Input type="email" id="email" width="325px"
					disabled defaultValue={user?.email || userDataParsed?.email}
					className={errors.email && 'error'}
				/>
				<Box color="red" textAlight="left" border="red" fz="13px" height="14px"
					m="0px 0 20px 0">{errors?.email && <>{errors?.email?.message || 'Error!'}</>}</Box>
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				gap="35px"
				borderTop={`2px solid ${DIVIDER}`}
				pt="24px"
				mb="24px"
			>
				<Button type="submit" disabled={!isValid || isLoading} primary width="100%">
					Зберегти
				</Button>
				<Button type="reset" secondary width="100%" onClick={handleCloseClick}>
					Скасувати
				</Button>
			</Box>
		</Form>
	)
}

const ChangePasswordTab: React.FC = () => {
	const dispatch = useAppDispatch();

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { isLoading, isPasswordChanged } = useAppSelector(state => state.user)

	const { setIsEditProfilePopupOpen } = useContext(PopupContext);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		watch
	} = useForm({
		mode: "all",
	});

	useEffect(() => {
		if (isPasswordChanged) {
			dispatch(setSuccessStatus(false))
			handleCloseClick();
		}
	}, [isPasswordChanged]);

	const handleToggleOldPassword = () => {
		setShowOldPassword(!showOldPassword);
	};
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};
	const handleToggleConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleCloseClick = () => {
		dispatch(resetProfileEditErrors());
		setIsEditProfilePopupOpen(false);
	};

	function handleSubmitChangePassword(data: PasswordChangeFormData) {
		dispatch(changeUserPassword(data));
	}

	return (
		<Form onSubmit={handleSubmit(handleSubmitChangePassword)}>
			<Box mb="35px">
				<Label htmlFor="old_password" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
					mb="6px"
					textAlight="left">Старий пароль</Label>
				<Box position="relative">
					<span onClick={handleToggleOldPassword} style={{
						position: "absolute", top: "16px",
						right: "10px", cursor: "pointer"
					}}>{showOldPassword ?
						<VisibilityOff />
						:
						<VisibilityOn />
						}</span>
					<Input
						type={showOldPassword ? "text" : "password"}
						id="old_password"
						name="old_password"
						width="325px"
						{...register("old_password", {
							required: 'Обов\'язкове поле для заповнення',
							pattern: {
								value: passwordRegex,
								message: `Пароль повинен містити не менше 8 символів, 1 літеру, 1 цифру та 1 спеціальний символ`
							},
						})}
						style={{ paddingRight: '35px' }}
						className={errors.old_password && 'error'}
					/>
				</Box>
				<Box color="red" textAlight="left" border="red" fz="13px" height="14px"
					width='300px'
					m="0px 0 20px 0">{errors?.old_password && <>{errors?.old_password?.message || 'Error!'}</>}</Box>
			</Box>
			<Box mb="35px">
				<Label htmlFor="new_password" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
					textAlight="left">Новий пароль</Label>
				<Box position="relative">
					<span onClick={handleTogglePassword} style={{
						position: "absolute", top: "16px",
						right: "10px", cursor: "pointer"
					}}>{showPassword ?
						<VisibilityOff />
						:
						<VisibilityOn />
						}</span>
					<Input
						type={showPassword ? "text" : "password"}
						id="new_password"
						name="new_password"
						width="325px"
						{...register("new_password", {
							required: 'Обов\'язкове поле для заповнення',
							pattern: {
								value: passwordRegex,
								message: `Пароль повинен містити не менше 8 символів, 1 літеру, 1 цифру та 1 спеціальний символ`
							},
						})}
						style={{ paddingRight: '35px' }}
						className={errors.new_password && 'error'}
					/>
				</Box>
				<Box color="red" textAlight="left" border="red" fz="13px" height="14px"
					width='300px'
					m="0px 0 20px 0">{errors?.new_password && <>{errors?.new_password?.message || 'Error!'}</>}</Box>
			</Box>
			<Box mb="35px">
				<Label htmlFor="new_password_2" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
					mt="16px"
					mb="6px" textAlight="left">Повторити пароль</Label>
				<Box position="relative">
					<span onClick={handleToggleConfirmPassword} style={{
						position: "absolute", top: "16px",
						right: "10px", cursor: "pointer"
					}}>{showConfirmPassword ?
						<VisibilityOff />
						:
						<VisibilityOn />
						}</span>
					<Input
						type={showConfirmPassword ? "text" : "password"}
						id="new_password_2"
						name="new_password_2"
						width="325px"
						{...register("new_password_2", {
							required: true,
							validate: (val: string) => {
								if (watch('new_password') != val) {
									return "Паролі не співпадають";
								}
							}
						})}
						style={{ paddingRight: '35px' }}
						className={errors.new_password_2 && 'error'}
					/>
				</Box>
				<Box color="red" textAlight="left" border="red" fz="13px" height="14px"
					m="0px 0 20px 0">{errors?.new_password_2
						&& <>{errors?.new_password_2?.message
							|| 'Обов\'язкове поле для заповнення'}</>}
				</Box>
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				gap="35px"
				borderTop={`2px solid ${DIVIDER}`}
				pt="24px"
				mb="24px"
			>
				<Button type="submit" disabled={!isValid || isLoading} primary width="100%">
					Зберегти
				</Button>
				<Button type="reset" secondary width="100%" onClick={handleCloseClick}>
					Скасувати
				</Button>
			</Box>
		</Form>
	)
}

export default PopupEditProfile;