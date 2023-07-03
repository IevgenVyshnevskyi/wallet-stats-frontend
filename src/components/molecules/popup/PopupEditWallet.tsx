import React, { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";

import { PopupContext } from "../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
	resetError,
	setActiveWallet,
	setSuccessStatus,
	walletAction
} from "../../../store/walletSlice";

import { titleFieldRules } from "../../../shared/utils/field-rules/title";
import { amountFieldRules } from "../../../shared/utils/field-rules/amount";

import { userId } from "../../../api/api";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from '../../atoms/button/Button.styled';
import { Typography } from '../../atoms/typography/Typography.styled';
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Form } from "../../atoms/form/Form.styled";
import { PopupWrapper } from "./Popup.styled";
import BaseField from "../base-field/BaseField";

import CrossIcon from './../../../shared/assets/icons/cross.svg';

import COLORS from "../../../shared/styles/variables";

import { IWallet, WalletFormData } from "../../../../types/wallet";

const PopupEditWallet: React.FC = () => {
	const dispatch = useAppDispatch()

	const { setIsEditWalletPopupOpen } = useContext(PopupContext);

	const {
		error,
		isEditWalletSuccess,
		isDeleteWalletSuccess,
		activeWallet,
		isLoading
	} = useAppSelector(state => state.wallet);

	const { user } = useAppSelector(state => state.user);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({ mode: "all" });

	const handleCloseClick = () => {
		setIsEditWalletPopupOpen(false);
		dispatch(setActiveWallet(null));
		dispatch(resetError());
		dispatch(setSuccessStatus(false));
	};

	const handleDeleteWallet = () => {
		dispatch(setSuccessStatus(false));
		dispatch(walletAction({
			method: "DELETE",
			id: String(activeWallet?.id)
		}));
	};

	const handleSub = (data: WalletFormData) => {
		const wallet: IWallet = {
			title: data.title,
			amount: data.amount,
			type_of_account: activeWallet.type_of_account,
			owner: user?.id || userId,
		}

		dispatch(walletAction({
			data: wallet,
			method: "PUT",
			id: String(activeWallet?.id)
		}))
	}

	useEffect(() => {
		if (isEditWalletSuccess || isDeleteWalletSuccess) {
			handleCloseClick()
		}
	}, [isEditWalletSuccess, isDeleteWalletSuccess]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleCloseClick()
			}
		}

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	return (
		<PopupWrapper onClick={handleCloseClick}>
			<Box onClick={event => event.stopPropagation()}>
				<Box>
					<Typography as="h2" fw="500" fz="22px" mb="25px">
						Редагування рахунку
					</Typography>
					<Form onSubmit={handleSubmit(handleSub)}>
						<Box mb="25px">
							<BaseField
								fieldType="text"
								label="Назва рахунку"
								errors={errors}
								name="title"
								registerOptions={register('title', titleFieldRules)}
								defaultValue={activeWallet?.title}
							/>
							<BaseField
								fieldType="text"
								label="Сума коштів на рахунку"
								errors={errors}
								name="amount"
								registerOptions={register('amount', amountFieldRules)}
								defaultValue={activeWallet?.amount}
							/>
						</Box>

						{error && <Typography as="p" color={COLORS.ALERT_1}>{error}</Typography>}

						<Box
							display="flex"
							width="320px"
							justifyContent="space-between"
							borderTop={`2px solid ${COLORS.DIVIDER}`}
							pt="25px"
							mb={activeWallet?.type_of_account === "bank" && "25px"}
						>
							<Button type="submit" width="148px" primary disabled={!isValid || isLoading}>
								Зберегти
							</Button>
							<Button type="reset" width="148px" secondary onClick={handleCloseClick}>
								Скасувати
							</Button>
						</Box>
					</Form>

					{activeWallet?.type_of_account === "bank" && (
						<Box display="flex" justifyContent="flex-end" onClick={handleDeleteWallet}>
							<ButtonLink disabled={isLoading}>Видалити рахунок</ButtonLink>
						</Box>
					)}
				</Box>
				<Button secondary onClick={handleCloseClick} p="10px 20px">
					<CrossIcon />
				</Button>
			</Box>
		</PopupWrapper>
	);
}

export default PopupEditWallet;