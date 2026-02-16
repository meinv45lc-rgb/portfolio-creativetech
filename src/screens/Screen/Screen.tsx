import { CheckIcon, EyeOffIcon, EyeIcon, LockIcon, UserIcon, MailIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

export const Screen = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  // Form validation
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Data for tabs
  const tabOptions = [
    { value: "login", label: "登录" },
    { value: "register", label: "注册" },
  ];

  const validateLogin = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!loginData.username.trim()) {
      newErrors.username = "请输入用户名";
    }
    
    if (!loginData.password) {
      newErrors.password = "请输入密码";
    } else if (loginData.password.length < 6) {
      newErrors.password = "密码至少6位";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!registerData.email.trim()) {
      newErrors.email = "请输入邮箱";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "邮箱格式不正确";
    }
    
    if (!registerData.username.trim()) {
      newErrors.username = "请输入用户名";
    } else if (registerData.username.length < 3) {
      newErrors.username = "用户名至少3位";
    }
    
    if (!registerData.password) {
      newErrors.password = "请输入密码";
    } else if (registerData.password.length < 6) {
      newErrors.password = "密码至少6位";
    }
    
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "请确认密码";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "两次密码不一致";
    }
    
    if (!agreeTerms) {
      newErrors.terms = "请同意用户协议和隐私政策";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("登录成功！");
    }, 1500);
  };

  const handleRegister = async () => {
    if (!validateRegister()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("注册成功！");
    }, 1500);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setErrors({});
  };

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="w-[1440px] h-[900px]">
        <div className="relative h-[900px]">
          <div className="absolute w-[900px] h-[1440px] top-[-270px] left-[270px] bg-white rotate-90" />

          <div className="flex flex-col w-[379px] items-center gap-12 absolute top-[167px] left-[530px]">
            {/* Header with logo and welcome text */}
            <div className="inline-flex flex-col items-center relative">
              <div className="inline-flex flex-col items-center justify-center gap-3 relative">
                <div className="relative w-[154.19px] h-[39px] mr-[-2.00px]">
                  <div className="absolute top-0 left-10 [font-family:'HarmonyOS_Sans-Bold',Helvetica] font-bold text-d-9d-9d-9 text-[28px] tracking-[0] leading-[39px] whitespace-nowrap">
                    数据分析
                  </div>
                  <img
                    className="absolute w-[29px] h-[27px] top-1.5 -left-px"
                    alt="Frame"
                    src="/frame-73.svg"
                  />
                </div>
              </div>
              <div className="relative w-fit [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-UD-mb-ca text-xl text-center tracking-[0] leading-9 whitespace-nowrap">
                {activeTab === "login" ? "欢迎回来" : "创建账户"}
              </div>
            </div>

            {/* Login/Register form container */}
            <div className="flex flex-col w-[379.37px] items-start gap-[60px] relative">
              <div className="flex flex-col items-start gap-8 relative self-stretch w-full">
                <div className="flex flex-col items-start gap-7 relative self-stretch w-full">
                  {/* Login/Register tabs */}
                  <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="flex w-full h-[54px] items-center justify-between p-1 bg-f-2f-4f-7 rounded-[10px]">
                      {tabOptions.map((tab) => (
                        <TabsTrigger
                          key={tab.value}
                          value={tab.value}
                          className={`flex w-[183px] h-[46px] items-center justify-center transition-all duration-200 ${
                            activeTab === tab.value
                              ? "bg-white [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-d-9d-9d-9 shadow-sm"
                              : "[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-UD-mb-ca hover:text-d-9d-9d-9"
                          } text-base rounded-lg`}
                        >
                          {tab.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {/* Login Form */}
                    <TabsContent value="login" className="mt-7">
                      <Card className="border-none shadow-none">
                        <CardContent className="flex flex-col items-start gap-3.5 p-0">
                          {/* Username field */}
                          <div className="flex flex-col gap-1 w-full">
                            <div className={`flex h-14 items-center gap-2 p-4 relative self-stretch w-full bg-white rounded-[10px] border border-solid transition-colors duration-200 ${
                              errors.username ? 'border-red-400' : 'border-[#dadee6] focus-within:border-x-2e-6be-6'
                            }`}>
                              <div style={{ display: 'flex', width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <circle cx="10" cy="7" r="5" stroke="#666F80"/>
                                  <path d="M2.5 18.5V18.5C6.40312 13.8163 13.5969 13.8163 17.5 18.5V18.5" stroke="#666F80"/>
                                </svg>
                              </div>
                              <Input
                                value={loginData.username}
                                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                                className="border-none shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-66-6f-80 text-sm focus-visible:ring-0"
                                placeholder="用户名"
                              />
                            </div>
                            {errors.username && (
                              <span className="text-red-500 text-xs [font-family:'PingFang_SC-Regular',Helvetica]">
                                {errors.username}
                              </span>
                            )}
                          </div>

                          {/* Password field */}
                          <div className="flex flex-col gap-1 w-full">
                            <div className={`flex h-[54px] items-center gap-2 p-4 relative self-stretch w-full bg-white rounded-[10px] border border-solid transition-colors duration-200 ${
                              errors.password ? 'border-red-400' : 'border-[#dadee6] focus-within:border-x-2e-6be-6'
                            }`}>
                              <div style={{ display: 'flex', width: 20, height: 20, padding: '1px 2px 1.334px 2px', justifyContent: 'center', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                  <path d="M8 0C9.01494 6.44546e-05 9.9927 0.402054 10.7119 1.12109C11.4311 1.84031 11.8339 2.818 11.834 3.83301V5.83301H13.3574C14.7043 5.83313 16 6.73512 16 8.05469V14.9414C16 16.2609 14.7043 17.163 13.3574 17.1631H2.64258C1.29569 17.163 4.30735e-05 16.2609 0 14.9414V8.05469C0 6.73512 1.29567 5.83313 2.64258 5.83301H4.16699V3.83301C4.16708 2.81794 4.56886 1.84032 5.28809 1.12109C6.0073 0.401945 6.98499 8.593e-05 8 0ZM2.64258 6.83301C1.63261 6.83313 1 7.48057 1 8.05469V14.9414C1.00005 15.5155 1.63265 16.163 2.64258 16.1631H13.3574C14.3674 16.163 15 15.5155 15 14.9414V8.05469C15 7.48057 14.3674 6.83313 13.3574 6.83301H2.64258ZM8.5 14H7.5V9H8.5V14ZM8 1C7.24869 1.00009 6.52573 1.29758 5.99512 1.82812C5.4645 2.35875 5.16708 3.08164 5.16699 3.83301V5.83301H10.834V3.83301C10.8339 3.0817 10.5354 2.35874 10.0049 1.82812C9.47427 1.29769 8.75124 1.00006 8 1Z" fill="#666E80"/>
                                </svg>
                              </div>
                              <Input
                                type={showPassword ? "text" : "password"}
                                value={loginData.password}
                                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                className="border-none shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-66-6f-80 text-sm focus-visible:ring-0"
                                placeholder="密码"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="hover:text-x-2e-6be-6 transition-colors duration-200"
                              >
                                {showPassword ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                    <path d="M10.8736 4C13.2943 4.16547 16.6944 5.45115 18.8316 9.00586C19.2481 9.69896 19.2439 10.5676 18.8219 11.2568C16.5159 15.0211 12.7817 16.2921 10.3961 16.2812H10.3922C7.88748 16.2468 4.23807 15.0474 1.9576 11.2412C1.54969 10.5601 1.54276 9.70621 1.95077 9.02051C4.15798 5.31231 7.90609 4.00173 10.3941 3.98145H10.4029L10.8736 4ZM10.398 4.98145C8.19508 5.00088 4.8066 6.17812 2.81014 9.53223C2.59248 9.89827 2.59432 10.3577 2.81503 10.7266C4.88237 14.1773 8.17259 15.2488 10.4029 15.2803C12.4867 15.289 15.8692 14.1608 17.9683 10.7344C18.1959 10.3627 18.1985 9.89366 17.9742 9.52051C15.9088 6.08563 12.5541 5.00291 10.398 4.98145ZM10.1803 6.21973C12.3403 6.21973 14.0919 7.97093 14.0924 10.1309L14.0875 10.333C13.9825 12.3996 12.2729 14.043 10.1803 14.043L9.97909 14.0381C7.91269 13.9329 6.26916 12.2234 6.26913 10.1309C6.26958 7.97121 8.02062 6.2202 10.1803 6.21973ZM10.1803 7.21973C8.5729 7.2202 7.26958 8.5235 7.26913 10.1309C7.26916 11.7386 8.57264 13.0425 10.1803 13.043C11.7882 13.043 13.0923 11.7389 13.0924 10.1309C13.0919 8.52321 11.788 7.21973 10.1803 7.21973Z" fill="#26334D"/>
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M17.2447 4L15.9117 5.33203C16.9873 6.09462 18.0044 7.12998 18.8316 8.50586C19.2481 9.19894 19.2439 10.0677 18.8219 10.7568C16.5159 14.5211 12.7817 15.7921 10.3961 15.7812H10.3922C9.22812 15.7652 7.81697 15.497 6.41074 14.833L4.36777 16.877L3.67441 16.1836L16.5514 3.30664L17.2447 4ZM13.567 7.67578C13.9001 8.25112 14.0922 8.91829 14.0924 9.63086L14.0875 9.83301C13.9825 11.8995 12.2729 13.5429 10.1803 13.543L9.9791 13.5381C9.34189 13.5057 8.74516 13.3203 8.22422 13.0186L7.16758 14.0762C8.32063 14.5658 9.45702 14.7669 10.4029 14.7803C12.4867 14.789 15.8693 13.6607 17.9684 10.2344C18.1959 9.86268 18.1985 9.39364 17.9742 9.02051C17.1883 7.71354 16.2151 6.74774 15.193 6.05078L13.567 7.67578ZM10.8736 3.5C11.7338 3.55881 12.7175 3.75887 13.7242 4.15234L12.943 4.93359C12.0204 4.62282 11.1387 4.48884 10.398 4.48145C8.1951 4.50088 4.80662 5.67814 2.81015 9.03223C2.59247 9.39828 2.59432 9.85766 2.81504 10.2266C3.46541 11.3121 4.23675 12.1622 5.0582 12.8184L4.34726 13.5293C3.47157 12.8135 2.65084 11.8983 1.95762 10.7412C1.54969 10.0601 1.54275 9.20621 1.95078 8.52051C4.15799 4.81233 7.9061 3.50173 10.3941 3.48145H10.4029L10.8736 3.5ZM8.96738 12.2754C9.33691 12.4454 9.74693 12.5428 10.1803 12.543C11.7882 12.5429 13.0923 11.2388 13.0924 9.63086C13.0923 9.19749 12.9948 8.78752 12.8248 8.41797L8.96738 12.2754ZM10.1803 5.71973C10.7596 5.71975 11.3095 5.84624 11.8043 6.07227L11.0309 6.8457C10.7617 6.76369 10.4761 6.71974 10.1803 6.71973C8.57292 6.7202 7.26953 8.0235 7.26914 9.63086C7.26915 9.92674 7.3129 10.2124 7.39512 10.4814L6.62265 11.2539C6.39641 10.7594 6.26915 10.2101 6.26914 9.63086C6.26959 7.47121 8.02063 5.7202 10.1803 5.71973Z" fill="#26334D"/>
                                  </svg>
                                )}
                              </button>
                            </div>
                            {errors.password && (
                              <span className="text-red-500 text-xs [font-family:'PingFang_SC-Regular',Helvetica]">
                                {errors.password}
                              </span>
                            )}
                          </div>

                          {/* Remember me and forgot password */}
                          <div className="flex items-center justify-between relative self-stretch w-full">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className="relative w-5 h-[20.44px] rounded-sm flex items-center justify-center transition-colors duration-200 group"
                              >
                                {rememberMe ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <rect y="0.37912" width="20" height="20.4419" rx="2" fill="#2E6BE6"/>
                                    <path d="M4.64587 9.72082L6.62934 11.7481L8.61282 13.7754L15.555 6.67987" stroke="white"/>
                                  </svg>
                                ) : (
                                  <span className="w-full h-full block relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" className="absolute inset-0 group-hover:hidden">
                                      <rect x="0.5" y="0.87912" width="19" height="19.4419" rx="1.5" fill="white" stroke="#2E6BE6"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" className="absolute inset-0 hidden group-hover:block">
                                      <rect x="0.5" y="0.87915" width="19" height="19.4419" rx="1.5" fill="#7BB4FF" fillOpacity="0.2" stroke="#2E6BE6"/>
                                    </svg>
                                  </span>
                                )}
                              </button>
                              <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-a-1a-7b-3 text-sm tracking-[0] leading-[22.5px]">
                                下次自动登录
                              </div>
                            </div>
                            <Button
                              variant="link"
                              className="p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-2e-6be-6 text-sm hover:underline"
                            >
                              忘记密码
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Register Form */}
                    <TabsContent value="register" className="mt-7">
                      <Card className="border-none shadow-none">
                        <CardContent className="flex flex-col items-start gap-3.5 p-0">
                          {/* Email field */}
                          <div className="flex flex-col gap-1 w-full">
                            <div className={`flex h-14 items-center p-4 relative self-stretch w-full bg-white rounded-[10px] border border-solid transition-colors duration-200 ${
                              errors.email ? 'border-red-400' : 'border-[#dadee6] focus-within:border-x-2e-6be-6'
                            }`}>
                              <Input
                                type="email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                className="border-none shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-66-6f-80 text-sm w-full focus-visible:ring-0"
                                placeholder="邮箱"
                              />
                            </div>
                            {errors.email && (
                              <span className="text-red-500 text-xs [font-family:'PingFang_SC-Regular',Helvetica]">
                                {errors.email}
                              </span>
                            )}
                          </div>

                          {/* Username field */}
                          <div className="flex flex-col gap-1 w-full">
                            <div className={`flex h-14 items-center p-4 relative self-stretch w-full bg-white rounded-[10px] border border-solid transition-colors duration-200 ${
                              errors.username ? 'border-red-400' : 'border-[#dadee6] focus-within:border-x-2e-6be-6'
                            }`}>
                              <Input
                                value={registerData.username}
                                onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                                className="border-none shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-66-6f-80 text-sm w-full focus-visible:ring-0"
                                placeholder="用户名"
                              />
                            </div>
                            {errors.username && (
                              <span className="text-red-500 text-xs [font-family:'PingFang_SC-Regular',Helvetica]">
                                {errors.username}
                              </span>
                            )}
                          </div>

                          {/* Password field */}
                          <div className="flex flex-col gap-1 w-full">
                            <div className={`flex h-[54px] items-center p-4 relative self-stretch w-full bg-white rounded-[10px] border border-solid transition-colors duration-200 ${
                              errors.password ? 'border-red-400' : 'border-[#dadee6] focus-within:border-x-2e-6be-6'
                            }`}>
                              <Input
                                type="password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                className="border-none shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-66-6f-80 text-sm w-full focus-visible:ring-0"
                                placeholder="密码"
                              />
                            </div>
                            {errors.password && (
                              <span className="text-red-500 text-xs [font-family:'PingFang_SC-Regular',Helvetica]">
                                {errors.password}
                              </span>
                            )}
                          </div>

                          {/* Confirm Password field */}
                          <div className="flex flex-col gap-1 w-full">
                            <div className={`flex h-[54px] items-center p-4 relative self-stretch w-full bg-white rounded-[10px] border border-solid transition-colors duration-200 ${
                              errors.confirmPassword ? 'border-red-400' : 'border-[#dadee6] focus-within:border-x-2e-6be-6'
                            }`}>
                              <Input
                                type="password"
                                value={registerData.confirmPassword}
                                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                                className="border-none shadow-none p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-66-6f-80 text-sm w-full focus-visible:ring-0"
                                placeholder="确认密码"
                              />
                            </div>
                            {errors.confirmPassword && (
                              <span className="text-red-500 text-xs [font-family:'PingFang_SC-Regular',Helvetica]">
                                {errors.confirmPassword}
                              </span>
                            )}
                          </div>

                          {/* Terms and conditions */}
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex items-center gap-2 relative self-stretch w-full">
                              <button
                                type="button"
                                onClick={() => setAgreeTerms(!agreeTerms)}
                                className="relative w-5 h-[20.44px] rounded-sm flex items-center justify-center transition-colors duration-200 group"
                              >
                                {agreeTerms ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <rect y="0.37912" width="20" height="20.4419" rx="2" fill="#2E6BE6"/>
                                    <path d="M4.64587 9.72082L6.62934 11.7481L8.61282 13.7754L15.555 6.67987" stroke="white"/>
                                  </svg>
                                ) : (
                                  <span className="w-full h-full block relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" className="absolute inset-0 group-hover:hidden">
                                      <rect x="0.5" y="0.87912" width="19" height="19.4419" rx="1.5" fill="white" stroke="#2E6BE6"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" className="absolute inset-0 hidden group-hover:block">
                                      <rect x="0.5" y="0.87915" width="19" height="19.4419" rx="1.5" fill="#7BB4FF" fillOpacity="0.2" stroke="#2E6BE6"/>
                                    </svg>
                                  </span>
                                )}
                              </button>
                              <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-a-1a-7b-3 text-sm tracking-[0] leading-[22.5px]">
                                我同意
                                <Button
                                  variant="link"
                                  className="p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-2e-6be-6 text-sm inline hover:underline"
                                >
                                  用户协议
                                </Button>
                                和
                                <Button
                                  variant="link"
                                  className="p-0 h-auto [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-x-2e-6be-6 text-sm inline hover:underline"
                                >
                                  隐私政策
                                </Button>
                              </div>
                            </div>
                            {errors.terms && (
                              <span className="text-red-500 text-xs [font-family:'PingFang_SC-Regular',Helvetica]">
                                {errors.terms}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Action button */}
              <div className="relative w-full">
                <Button
                  onClick={activeTab === "login" ? handleLogin : handleRegister}
                  disabled={
                    isLoading ||
                    (activeTab === "login"
                      ? !(loginData.username && loginData.password)
                      : !(
                          registerData.email &&
                          registerData.username &&
                          registerData.password &&
                          registerData.confirmPassword &&
                          agreeTerms
                        )
                    )
                  }
                  className="w-full h-[54px] bg-x-2e-6be-6 rounded-[10px] shadow-[0px_2px_8px_#12409e33] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {activeTab === "login" ? "登录中..." : "注册中..."}
                    </div>
                  ) : (
                    activeTab === "login" ? "登录" : "注册"
                  )}
                </Button>
                {(activeTab === "login"
                  ? !(loginData.username && loginData.password)
                  : !(
                      registerData.email &&
                      registerData.username &&
                      registerData.password &&
                      registerData.confirmPassword &&
                      agreeTerms
                    )
                ) && !isLoading && (
                  <div className="absolute inset-0 bg-[#F2F2F2] opacity-60 rounded-[10px] pointer-events-none z-10" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};