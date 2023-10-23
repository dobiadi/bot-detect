export default async function inconsistentPermissions(): Promise<boolean> {
  const permissionStatus = await navigator.permissions.query({
    name: 'notifications'
  });

  return (
    Notification.permission === 'denied' && permissionStatus.state === 'prompt'
  );
}
