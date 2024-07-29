import { FC, useState } from 'react';
import { Text } from 'shared/UI';
import { useAppSelector } from 'shared/hooks';
import { LoginInput, PasswordConfirmInput, PasswordInput, ProfileImageLoader, SaveButton } from 'features/Settings';
import cl from './style.module.scss';

interface SettingsWidgetProps {}

export const SettingsWidget: FC<SettingsWidgetProps> = () => {
	const { userInfo } = useAppSelector(state => state.user);
	const [image, setImage] = useState<File | null>(null);
	const [login, setLogin] = useState(userInfo ? userInfo.login : '');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	return (
		<div className={cl.SettingsWidget}>
			<div className={cl.Container}>
				<section>
					<ProfileImageLoader setImage={setImage} />
				</section>
				<section>
					<LoginInput login={login} setLogin={setLogin} />
				</section>
				<section>
					<PasswordInput password={password} setPassword={setPassword} />
					<PasswordConfirmInput passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm} />
				</section>
				<section>
					<Text dark>
						Всего места на диске: <span>{userInfo?.totalSpace.toFixed(2)} ГБ</span>
					</Text>
				</section>
				<section>
					<SaveButton image={image} login={login} password={password} passwordConfirm={passwordConfirm} />
				</section>
			</div>
		</div>
	);
};
