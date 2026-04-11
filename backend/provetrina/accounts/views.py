from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from provetrina.accounts.models import User
from provetrina.accounts.permissions import IsOwnerOrAdminUserReadOnly
from provetrina.accounts.serializers import UserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.order_by('username').all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            return permission_classes
        if self.action == 'list':
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [
                IsAuthenticated,
                IsOwnerOrAdminUserReadOnly,
            ]
        return [permission() for permission in permission_classes]
