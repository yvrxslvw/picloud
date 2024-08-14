import { FC, useState } from 'react';
import { Text } from 'shared/UI';
import { useAppSelector } from 'shared/hooks';
import { LoginInput, PasswordConfirmInput, PasswordInput, ProfileImageLoader, SaveButton } from 'features/Settings';
import cl from './style.module.scss';
import { convertFileSize } from 'shared/utils';

interface SettingsWidgetProps {}

export const SettingsWidget: FC<SettingsWidgetProps> = () => {
	const { userInfo } = useAppSelector(state => state.user);
	const [data, setData] = useState<{ image: File | null; login: string; password: string; passwordConfirm: string }>({
		image: null,
		login: userInfo.login,
		password: '',
		passwordConfirm: '',
	});

	return (
		<div className={cl.SettingsWidget}>
			<div className={cl.Container}>
				<section>
					<ProfileImageLoader data={data} setData={setData} />
				</section>
				<section>
					<LoginInput data={data} setData={setData} />
				</section>
				<section>
					<PasswordInput data={data} setData={setData} />
					<PasswordConfirmInput data={data} setData={setData} />
				</section>
				<section>
					<Text dark>
						Всего места на диске: <span>{convertFileSize(userInfo.totalSpace)} ГБ</span>
					</Text>
				</section>
				<section>
					<SaveButton data={data} setData={setData} />
				</section>
			</div>
		</div>
	);
};
