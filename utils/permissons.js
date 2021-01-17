import * as Permissions from 'expo-permissions';
import React,{Component} from "react";

export default function Permisson () {
  const [permissons] = Permissions.usePermissions(Permissions.CAMERA_ROLL, Permissions.NOTIFICATIONS, {ask: true})

}
