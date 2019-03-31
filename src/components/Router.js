import React from 'react';
import { Router, Scene, Tabs, } from 'react-native-router-flux';
import { NavBar, IconTab, } from './common';
import HomeScreen from './HomeScreen';
import NewsHome from './NewsHome';
import Miscellaneous from './Miscellaneous';
import DoctorHome from './DoctorHome';
import EditProfile from './EditProfile';
import EyeDropper from './EyeDropper';
import StopWatch from './StopWatch';
import EyeChart from './EyeChart';
import DoctorEyeDrop from './DoctorEyeDrop';
import DoctorEyeDropDetail from './DoctorEyeDropDetail';

class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <Tabs showLabel={false}>
                    <Scene key='main' initial icon={IconTab} iconName='home' /* initial */>
                        <Scene 
                            key='home' 
                            title='เมนูหลัก' 
                            component={HomeScreen} 
                            navBar={NavBar} 
                            initial  
                        />
                        <Scene 
                            key='edit_profile'
                            title='แก้ไขข้อมูล'
                            component={EditProfile}
                            navBar={NavBar}
                            onBack
                            // initial
                        />
                        <Scene 
                            key='eyedropper'
                            title='ยาหยอดตา'
                            component={EyeDropper}
                            navBar={NavBar}
                            onBack
                        />
                        <Scene 
                            key='stopwatch'
                            title='จับเวลาหยอดตา'
                            component={StopWatch}
                            navBar={NavBar}
                            onBack
                        />
                        <Scene 
                            key='chart'
                            title='สถิติการหยอดตา'
                            component={EyeChart}
                            navBar={NavBar}
                            onBack
                            // initial  
                        />
                    </Scene>
                    <Scene key='news' icon={IconTab} iconName='comment-text-multiple'>
                        <Scene 
                            key='news_home' 
                            title='สาระน่ารู้' 
                            component={NewsHome} 
                            navBar={NavBar} 
                            initial 
                        />
                    </Scene>
                    <Scene key='etc' icon={IconTab} iconName='comment-question'>
                        <Scene 
                            key='etc_home' 
                            title='เบ็ดเตล็ด' 
                            component={Miscellaneous} 
                            navBar={NavBar} 
                            initial 
                        />
                    </Scene>
                    <Scene key='doctor' icon={IconTab} iconName='clipboard-pulse' initial>
                        <Scene 
                            key='doctor_home' 
                            title='แพทย์' 
                            component={DoctorHome} 
                            navBar={NavBar} 
                            initial 
                        />
                        <Scene 
                            key='doctor_eyedrop'
                            title='จ่ายยาหยอดตา'
                            component={DoctorEyeDrop}
                            navBar={NavBar}
                            onBack
                        />
                        <Scene 
                            key='doctor_eyedrop_detail'
                            title='ตั้งค่ายาหยอดตา'
                            component={DoctorEyeDropDetail}
                            navBar={NavBar}
                            onBack
                        />
                    </Scene>
                </Tabs>
            </Router>
        );
    }
}

export default RouterComponent;
