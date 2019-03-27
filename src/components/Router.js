import React from 'react';
import { Router, Scene, Tabs, } from 'react-native-router-flux';
import { NavBar, IconTab, } from './common';
import HomeScreen from './HomeScreen';
import NewsHome from './NewsHome';
import Miscellaneous from './Miscellaneous';
import DoctorHome from './DoctorHome';

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
                    <Scene key='doctor' icon={IconTab} iconName='clipboard-pulse'>
                        <Scene 
                            key='doctor_home' 
                            title='แพทย์' 
                            component={DoctorHome} 
                            navBar={NavBar} 
                            initial 
                        />
                    </Scene>
                </Tabs>
            </Router>
        );
    }
}

export default RouterComponent;
