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
import DoctorPickEyeDrop from './DoctorPickEyeDrop';
import DoctorAppointment from './DoctorAppointment';
import DoctorEyeDropGroup from './DoctorEyeDropGroup';
import Magnifier from './Magnifier';
import EyeDropsVideo from './EyeDropsVideo';
import Timer from './LocalNotifications';
import EyeCarePDF from './EyedropByMySelf';
import GlaucomaInfoPDF from './GlaucomaInfo';

class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <Tabs showLabel={false}>
                    <Scene key='main' initial icon={IconTab} iconName='home' initial>
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
                        <Scene 
                            key='eyecarepdf' 
                            title='การหยอดตาด้วยตนเอง' 
                            component={EyeCarePDF}  
                            navBar={NavBar} 
                        />
                        <Scene 
                            key='glaucomapdf' 
                            title='ข้อมูลโรคต้อหิน' 
                            component={GlaucomaInfoPDF}  
                            navBar={NavBar} 
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
                        <Scene 
                            key='magnifier' 
                            title='แว่นขยาย' 
                            component={Magnifier} 
                            navBar={NavBar} 
                        />
                        <Scene 
                            key='eyedropsvideo' 
                            title='วิธีหยอดตา' 
                            component={EyeDropsVideo} 
                            navBar={NavBar} 
                        />
                    </Scene>
                    <Scene key='doctor' icon={IconTab} iconName='clipboard-pulse'>
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
                            title='ปรับแต่งการจ่ายยา'
                            component={DoctorEyeDropDetail}
                            navBar={NavBar}
                            onBack
                        />
                        <Scene 
                            key='doctor_pick_new_group'
                            title='เลือกยาหยอดตา'
                            component={DoctorEyeDropGroup}
                            navBar={NavBar}
                            onBack
                        />
                        <Scene 
                            key='doctor_pick_new'
                            title='เลือกยาหยอดตา'
                            component={DoctorPickEyeDrop}
                            navBar={NavBar}
                            onBack
                        />
                        <Scene 
                            key='doctor_make_appointment'
                            title='นัดพบแพทย์'
                            component={DoctorAppointment}
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
