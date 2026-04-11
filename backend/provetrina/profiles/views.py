from django.db.models import Q
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ModelSerializer

from provetrina.profiles import models, serializers
from provetrina.profiles.permissions import (
    IsProfileOwnerOrReadOnlyPublicProfile,
    IsSectionOwnerOrReadOnlyPublicProfile,
)


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProfileSerializer

    def get_queryset(self):  # type: ignore
        user = self.request.user
        q = Q(public=True)
        if self.action != 'list':
            q = q | Q(owner_id=user.pk)
        return models.Profile.objects.filter(q).order_by('owner__username')

    def get_permissions(self):
        permission_classes = [IsProfileOwnerOrReadOnlyPublicProfile]
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


@extend_schema(
    parameters=[
        OpenApiParameter(
            required=True,
            name='profile_id',
            type=OpenApiTypes.INT,
            style=OpenApiParameter.QUERY,
        ),
    ]
)
class SectionBaseModelViewSet(viewsets.ModelViewSet):
    serializer_class: type[ModelSerializer]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsSectionOwnerOrReadOnlyPublicProfile,
        ]
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsSectionOwnerOrReadOnlyPublicProfile]
        return [permission() for permission in permission_classes]

    def get_profile_id(self):
        try:
            return int(self.request.GET.get('profile_id', '-1'))
        except ValueError:
            return -1

    def get_queryset(self):
        user = self.request.user
        profile_id = self.get_profile_id()
        return (
            self.serializer_class.Meta.model.objects.select_related('profile')  #  type: ignore
            .filter(profile_id=profile_id)
            .filter(Q(profile_id=user.pk) | Q(profile__public=True))
            .order_by('order')
        )


class LinkViewSet(SectionBaseModelViewSet):
    serializer_class = serializers.LinkSerializer


class EducationViewSet(SectionBaseModelViewSet):
    serializer_class = serializers.EducationSerializer


class WorkExperienceViewSet(SectionBaseModelViewSet):
    serializer_class = serializers.WorkExperienceSerializer


class ProjectViewSet(SectionBaseModelViewSet):
    serializer_class = serializers.ProjectSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.prefetch_related('links')


class CourseViewSet(SectionBaseModelViewSet):
    serializer_class = serializers.CourseSerializer


class SkillViewSet(SectionBaseModelViewSet):
    serializer_class = serializers.SkillSerializer
